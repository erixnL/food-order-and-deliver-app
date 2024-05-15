'use client'
import React, { useEffect, useState } from 'react';
import "./OrderDetails.css";
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GoDotFill } from "react-icons/go";


const OrderDetails = () => {
  const pathname = usePathname();
  const orderId = pathname.split('/').pop();
  console.log("OrderDetails itemId", orderId);

  const [currentOrder, setCurrentOrder] = useState({});
  
  console.log("OrderDetails currentOrder", currentOrder);

  useEffect (() => {
    const fetchOrder = async () =>{
      if(orderId) {
        const response = await fetch(`/api/restaurantOrder`);
        if(response.ok){
          const data = await response.json();
          const order = data.find(order => order._id === orderId);
          setCurrentOrder(order);
        } else{
          console.error("Failed to fetch orders");
          setCurrentOrder({});
        }
      }else{
        console.error("No OrderId found!");
      }
    }
    fetchOrder();
  },[orderId]);

  function formatDate(dateString) {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };  // Options for the date part
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };  // Options for the time part

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  }

  const statusDescriptions = {
    'new': 'New Order',
    'rejected': 'Order Rejected', 
    'refund': 'Refund',
    'accepted': 'Order Accepted',
    'preparing': 'Preparing',
    'ready_for_pickup': 'Ready for Pickup',
    'on_the_way': 'On the Way',
    'delivered': 'Delivered'
  };

  return (
    <div className="OrderDetail flex">
      <div className="back">
      <Link href="/">&lt; Back to the home page</Link>
      </div>
      <h1 className='title'>Order Detail</h1>
      <div class="cell subtitle">Order ID: {currentOrder._id}</div>
      <div className='row'>
          <div className="cell">{currentOrder.restaurantName}</div>
      </div>
      <div className='subtitle flex'>
          <div className="cell">Delivery Address</div>
          <div className="cell">Phone</div>
      </div>
      <div className='row flex'>
          <div className="cell">{currentOrder.deliveryAddress}</div>
          <div className="cell">{currentOrder.deliveryContactInfo}</div>
      </div>
      <div className="cell subtitle">{currentOrder?.items?.length} items</div>
      {currentOrder.items?.map((item, index)=>{
          return (
          <div className="item" key={item.itemId}>
              <div className="cell">{item.menuItem}</div>
              <div className="cell">X{item.quantity}</div>
              <div className="cell item-price">${item.price.toFixed(2)}</div>
          </div>
          )
      })}
      <div className='total flex'>
          <div className="cell subtitle">Total</div>
          <div className="cell amount">${currentOrder.totalPrice?.toFixed(2)}</div>
      </div>
      <div className='status flex'>
          <div className="cell subtitle">Status Update</div>
          <div className="status-details flex">
            <GoDotFill color="#FA9232"/>
            <div className="cell">{formatDate(currentOrder.updatedAt)}</div>
            <div className="cell">{statusDescriptions[currentOrder.orderStatus]}</div>
          </div>
      </div>
    </div>
)
}

export default OrderDetails