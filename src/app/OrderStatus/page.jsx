'use client'
import React, { useContext, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import "./OrderStatus.css"
import Link from 'next/link'
import { CiLocationOn } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { AppContext } from '@/Context/AppContext';
import { IoCheckmarkDoneCircleOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";




const OrderStatus = () => {
  const {orderDelivered, setShowRating} = useContext(AppContext);

  const [orderStatus, setOrderStatus] = useState([]);
  useEffect(() => {
    const fetchOrderStatus = async () => {
      const response = await fetch(`/api/orders`);
      const data = await response.json();
      console.log(data)

      setOrderStatus(data)
    };

     fetchOrderStatus();
  }, []);

  return (
    <div className='order-status flex'>
      <div className="back">
        <Link href={"/"}>&lt; Back to Home Page</Link>
      </div>
      <h2>Order Status</h2>
      <div className="grey-box flex">
        <div className='grey-box-heading'>Order details</div>
        {/* Order items to be replaced */}
        <div className="order-item flex">
          <div className="item-name">Double Cheeseburger</div>
          <div className="item-quantity">X 1</div>
        </div>
        <hr/>
        <div className="order-address flex">
          <div className="icon">
            <CiLocationOn />
          </div>
          <div className="address">
            U12  88 Smith street wollongong NSW 2500
          </div>
        </div>
      </div>
      <div className="order-tracking">
        <div className="icon"><FaCircle color="#2861D1"/></div>
        <div className="icon"><FaCircle color="#2861D1"/></div>
        <div className="icon"><FaCircle color="#D9D9D9"/></div>
        <div className="icon"><FaCircle color="#D9D9D9"/></div>
        <div className="status-description">Order Accepted</div>
        <div className="status-description">Order Prepared</div>
        <div className="status-description">On the way</div>
        <div className="status-description">Delivered</div>
        <div className="order-timing">24 March 12:39pm</div>
        <div className="order-timing">24 March 12:39pm</div>
        <div className="order-timing">24 March 12:39pm</div>
        <div className="order-timing">24 March 12:39pm</div>
      </div>
      { orderDelivered 
      ?
        <div className="delivered-container flex">
          <div className="delivered-confirm flex">
            <div className="icon">
              <IoCheckmarkDoneCircleOutline color="#DE250C" size="25"/>
            </div>
            <div className="text">Your order is arrived!</div>
          </div>
          <button className="btn" onClick={()=>setShowRating(true)}>Give a rating!</button>
          <div className="delivery-person-contact flex">
            <div className="icon">
              <IoPersonCircleOutline color="white" size="25" />
            </div>
            <div className="text">Darren Lam</div>
            <div className="icon end"><FaPhoneVolume color="white" size="18"/></div>
          </div>

        </div>
      : 
        ""
      }
    </div>
  )
}

export default OrderStatus