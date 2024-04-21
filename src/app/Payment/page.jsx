'use client'
import React from 'react'
import "./Payment.css"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const Payment = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log(session);
}, [session]);


  return (
    <div className='payment flex'>
      <div className="back-to-order"><Link href={"/placeorder"}>&lt; Back to order</Link></div>
      <h2>Payment</h2>
      {status === 'authenticated' && session && session.user ? (
      <><div className="card-number" >
          <input type="text" value={session.user.payment.cardNumber}/>
        </div><div className="card-expirydate flex">
            <input type="text" value={session.user.payment.cardExpiry} />
            <input type="number" value={session.user.payment.cardCVV} />
          </div><div className="card-name">
            <input type="text" value={session.user.username} />
          </div><button className='btn'>Pay</button></>) :
      (
        <>
        </>
      ) }
    </div>
  )
}

export default Payment