import React from 'react'
import "./Receipt.css"
import Link from 'next/link'

const Receipt = () => {
  return (
    <div className='receipt flex'>
      <div className="back">
        <Link href={"/OrderHistory"}>&lt; Back to your order</Link>
      </div>
      <h2>Your Receipt</h2>
      <div className="receipt-container flex">
        <div className="order-number-date flex">
          <div>Order No: XXXXXXXXXXXX XXXXXXXX XXXXXXXX</div>
          <div>Order date: 28 Feb 2024, 12:39 pm</div>
          <div>Order address: Cnr Burelli, Stewart, Corrimal St, Wollongong NSW 2500</div>
        </div>
        <hr/>
        <div className="receipt-heading">Transaction Record</div>
        <div className="card-record-container">
          <div>Card</div>
          <div className='end'>VISA</div>
          <div>Card Number</div>
          <div className='end'>*************1234</div>    
          <div>Type</div>
          <div className='end'>Online</div>              
        </div>
        <hr/>
        <div className="receipt-heading">Order total</div>
        <div className="card-record-container">
          <div>Subtotal</div>
          <div className='end'>$17.1</div>
          <div>Delivery Fee</div>
          <div className='end'>$1.99</div>    
          <div>Service Fee</div>
          <div className='end'>$1.71</div>              
        </div>
        <hr/>
        <div className="order-total-container flex">
          <div>Total</div>
          <div>$20.8</div>
        </div>
      </div>
      
    </div>
  )
}

export default Receipt