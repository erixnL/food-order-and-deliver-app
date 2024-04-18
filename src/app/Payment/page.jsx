import React from 'react'
import "./Payment.css"
import { Link } from 'react-router-dom'

const Payment = () => {
  return (
    <div className='payment flex'>
      <div className="back-to-order"><Link to="/placeorder">&lt; Back to order</Link></div>
      <h2>Payment</h2>
      <div className="card-number">
        <input type="text" placeholder='Card Number*'/>
      </div>
      <div className="card-expirydate flex">
        <input type="number" placeholder='MM*'/>
        <input type="number" placeholder='YY*'/>
        <input type="number" placeholder='CVV/CVC*'/>
      </div>
      <div className="card-name">
        <input type="text" placeholder='Full name*'/>
      </div>
      <button className='btn'>Pay</button>
    </div>
  )
}

export default Payment