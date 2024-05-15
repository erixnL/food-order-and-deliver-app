'use client'
import React, { useContext, useState, useEffect } from 'react'
import "./OrderStatus.css"
import Link from 'next/link'
import { CiLocationOn } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";
import { AppContext } from '@/Context/AppContext';
import { IoCheckmarkDoneCircleOutline, IoPersonCircleOutline } from "react-icons/io5";
import { FaPhoneVolume } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import RatingPopUp from '@/components/RatingPopUp/RatingPopUp';


const OrderStatus = () => {

  const pathname = usePathname();
  const orderId = pathname.split('/').pop();

  const {orderHistory, setShowRating, showRating} = useContext(AppContext);

  console.log("orderHistory from Order status", orderHistory)

  const [order, setOrder] = useState(null);

  console.log("order from Order status", order)

  useEffect(() => {
    // Assuming orderHistory is already populated from context
    const foundOrder = orderHistory.find(order => order._id === orderId);
    setOrder(foundOrder);
    console.log("Set order to:", foundOrder);

  }, [orderId, orderHistory]);

  if (!order) {
    return <div>Loading order details...</div>;
  }

  function getColorForStatus(status, index) {
    const statusLevels = {
      'new': 0,
      'accepted': 1,
      'preparing': 2,
      'ready_for_pickup': 3,
      'on_the_way': 3,
      'delivered': 4
    };
  
    return index < statusLevels[status] ? "#2861D1" : "#D9D9D9";
  }
    

  return (
    <>
      {showRating? <RatingPopUp /> : <></>}
      <div className='order-status flex'>
        
        <div className="back">
          <Link href={"/OrderHistory"}>&lt; Back to Order History</Link>
        </div>
        <h2>Order Status</h2>
        <div className="grey-box flex">
          <div className='grey-box-heading'>Order details for {order.restaurantName}</div>
          {order && Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <div className="order-item flex" key={item._id}>
                <div className="item-name">{item.menuItem}</div>
                <div className="item-quantity">x{item.quantity}</div>
              </div>
            ))
          ) : (
            <div>No items found in this order.</div>
          )}
          
          <hr/>
          <div className="order-address flex">
            <div className="icon">
              <CiLocationOn />
            </div>
            <div className="address">
              {order.deliveryAddress}
            </div>
          </div>
        </div>
        <div className="order-tracking">
          {Array.from({ length: 4 }).map((_, index) => (
              <div className="icon" key={index}>
                <FaCircle color={getColorForStatus(order.orderStatus, index)} />
              </div>
            ))}
          <div className="status-description">Order Accepted</div>
          <div className="status-description">Order Prepared</div>
          <div className="status-description">On the way</div>
          <div className="status-description">Delivered</div>
          {/* <div className="order-timing">24 March 12:39pm</div>
          <div className="order-timing">24 March 12:39pm</div>
          <div className="order-timing">24 March 12:39pm</div>
          <div className="order-timing">24 March 12:39pm</div> */}
        </div>
        { order.orderStatus === "ready_for_pickup" || order.orderStatus === "on_the_way" 
        ?
          <div className="delivered-container flex">
            <div className="delivery-person-contact flex">
              <div className="icon">
                <IoPersonCircleOutline color="white" size="25" />
              </div>
              <div className="text">Darren Lam</div>
              <div className="icon end"><FaPhoneVolume color="white" size="18"/></div>
            </div>

          </div>
        : order.orderStatus === "delivered" ?
          <div className="delivered-container flex">
            <div className="delivered-confirm flex">
              <div className="icon">
                <IoCheckmarkDoneCircleOutline color="#DE250C" size="25"/>
              </div>
              <div className="text">Your order is arrived!</div>
            </div>
            <button className="rating-btn btn" onClick={()=>setShowRating(true)}>Give a rating!</button>
            <div className="delivery-person-contact flex">
              <div className="icon">
                <IoPersonCircleOutline color="white" size="25" />
              </div>
              <div className="text">Darren Lam</div>
              <div className="icon end"><FaPhoneVolume color="white" size="18"/></div>
            </div>
          </div>
        :  ""
        }
      </div>
    </>
    
  )
}

export default OrderStatus