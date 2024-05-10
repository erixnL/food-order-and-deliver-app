'use client'
import React, { useContext, useEffect } from 'react'
import "./OrderHistory.css"
import Link from 'next/link'
import { AppContext } from '@/Context/AppContext'
import { useSession } from 'next-auth/react'

const OrderHistory = () => {
  const {orderHistory, setOrderHistory} = useContext(AppContext);
  console.log("orderHistory from Order History", orderHistory)
  const { data: session, status } = useSession();

  const hasOrders = orderHistory.length > 0;

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`/api/orders/${session?.user.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrderHistory(data);
      } else {
        console.error("Failed to fetch orders");
        setOrderHistory([]);  // Ensure state is clear if fetch fails
      }
    };

    fetchOrders();
  }, [session]);

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
    'accepted': 'Order Accepted',
    'preparing': 'Preparing',
    'ready_for_pickup': 'Ready for Pickup',
    'on_the_way': 'On the Way',
    'delivered': 'Delivered'
  };

  return (
    <div className='order-history flex'>
      <div className="back"><Link href={"/"}>&lt; Back to Home Page</Link></div>
      <h2>Your Orders</h2>
      { hasOrders
      ? (  
        <div className="order-list-container flex">
          {orderHistory.map((item, index)=>{
            return(
              <div className="order-container flex" key={index}>
                <div className="description-container flex">
                  <div>{item.restaurantName}</div>
                  <div>{formatDate(item.createdAt)}</div>
                  <div>Order Status: {statusDescriptions[item.orderStatus]}</div>
                </div>

                <div className="button-container flex">
                  <Link href={`/OrderStatus/${item._id}`}><div className="track-order">Track the progress</div></Link>
                  {item.orderStatus === "delivered" 
                  ? <div className="button-receipt flex">
                      <Link href={`/Receipt/${item._id}`}>
                        <div className="button-one">View Receipt</div>
                      </Link>
                      <div className="button-one">Reorder</div>
                    </div>
                  : ""
                  }
                </div> 
              </div>
            )
          })

          }
        </div>
      )
      : (  
        <div className="no-order flex">
          <div className='grey-box'></div>
          <div>OPPS! No orders yet!</div>
          <Link href={"/"}><button className='btn'>Start shopping</button></Link>
        </div>
      )
      }
    </div>
  )
}

export default OrderHistory