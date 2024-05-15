'use client'
import React, { useContext } from 'react'
import "./Notification.css"
import { AppContext } from '@/Context/AppContext';
import Link from 'next/link';
import {useSession} from "next-auth/react";
import { IoFastFood } from "react-icons/io5";



const Notification = () => {

  const {setShowNotification} = useContext(AppContext);
  const { data: session, status } = useSession(); 


    return (
    <div className="notification flex">
      <div className="notificaiton-heading">Notifications:</div>
      <div 
        onClick={() => setShowNotification(false)}
        className="notification-text flex">
        <IoFastFood size={40}/>
        {session?.user.userRole === "customer" 
        ?
        <Link href="/OrderHistory">Your order is accepted!</Link> 
        :
        session?.user.userRole === "restaurant" 
        ?
        <Link href="/RestaurantOrderList">You have new order! Accept or reject the order.</Link> : 
        <Link href="/DeliveryOrderList">You have new order to pick up!</Link> 
        }
      </div>
    </div>
  )
}

export default Notification