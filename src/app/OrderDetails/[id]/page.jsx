'use client'
import React, { useEffect, useState } from 'react';
import "./OrderDetails.css";
import { usePathname } from 'next/navigation';

const OrderDetails = () => {
  const pathname = usePathname();
  const orderId = pathname.split('/').pop();
  console.log("OrderDetails itemId", orderId);

  const [currentOrder, setCurrentOrder] = useState({});
  
  console.log("OrderDetails", currentOrder)

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

  return (
    <div>
      {orderId}
      {currentOrder.restaurantName}
    </div>
    
  )
}

export default OrderDetails