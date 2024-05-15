'use client'
import { usePathname } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import "./Receipt.css"
import Link from 'next/link'
import { AppContext } from '@/Context/AppContext';

const Receipt = () => {
  const pathname = usePathname();
  const orderId = pathname.split('/').pop();

  const {orderHistory} = useContext(AppContext);

  console.log("orderHistory from Order receipt", orderHistory)

  const [order, setOrder] = useState(null);

  console.log("order from Order receipt", order)

  useEffect(() => {
    // Assuming orderHistory is already populated from context
    const foundOrder = orderHistory.find(order => order._id === orderId);
    setOrder(foundOrder);
    
  }, [orderId, orderHistory]);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  function formatDate(dateString) {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };  // Options for the date part
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };  // Options for the time part

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  }



  return (
    <div className='receipt flex'>
      <div className="back">
        <Link href={"/OrderHistory"}>&lt; Back to your order</Link>
      </div>
      <h2>Your Receipt</h2>
      <div className="receipt-container flex">
        <div className="order-number-date flex">
          {/* <div>Order No: {order._id}</div> */}
          <div>Order date: {formatDate(order.createdAt)}</div>
          <div>Order address: {order.deliveryAddress}</div>
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
          <div className='end'>${order.totalPrice-order.deliveryFee-order.serviceFee}</div>
          <div>Delivery Fee</div>
          <div className='end'>${order.deliveryFee}</div>    
          <div>Service Fee</div>
          <div className='end'>${order.serviceFee}</div>              
        </div>
        <hr/>
        <div className="order-total-container flex">
          <div>Total</div>
          <div>{order.totalPrice}</div>
        </div>
      </div>
      
    </div>
  )
}

export default Receipt