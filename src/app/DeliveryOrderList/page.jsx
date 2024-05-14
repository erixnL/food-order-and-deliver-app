'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import "./DeliveryOrderList.css"
import OrderNavbar from '@/components/OrderNavbar/Ordernavbar'
import { MdContentPaste } from "react-icons/md";



const DeliveryOrderList = () => {

  const { data: session, status } = useSession();
  const [orderList, setOrderList] = useState([]);
  const [filteredOrderList, setFilteredOrderList] = useState([]);
  const [currentFilters, setCurrentFilters] = useState(['ready_for_pickup']); 

  console.log("OrderList session", session?.user);
  console.log("OrderList orderList", orderList);
  console.log("OrderList filteredOrderList", filteredOrderList);

  const filtersToShow = ['Ready for pick up', 'Delivery', 'Delivered', 'All'];

  useEffect(()=>{
    const fetchOrders = async() => {
      const response = await fetch(`/api/restaurantOrder`);
      if(response.ok){
        const data = await response.json();
        const sortedOrders = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrderList(sortedOrders);

      }else {
        console.error("Failed to fetch orders");
        setOrderList([]);  // Ensure state is clear if fetch fails
      }
    };
    fetchOrders();
  },[session]); 

  useEffect(() => {
    if (currentFilters.includes('all')) {
      setFilteredOrderList(orderList);
    } else {
      const filtered = orderList.filter(order => currentFilters.includes(order.orderStatus));
      setFilteredOrderList(filtered);
    }
  }, [orderList, currentFilters]);
  
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch('/api/orderUpdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId, newStatus })
      });
      if (response.ok) {
        const updatedOrder = await response.json();
        // Replace the order in orderList with the updated one
        setOrderList(orderList.map(order => order._id === orderId ? updatedOrder : order));
        alert('Order status updated successfully.');
      } else {
        throw new Error('Failed to update order status');
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      alert('Error updating order status: ' + error.message);
    }
  };
  function formatDate(dateString) {
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };  // Options for the date part
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };  // Options for the time part

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-US', optionsTime);

    return `${formattedDate}, ${formattedTime}`;
  }

  return (
    <div className='order-list'>
      <OrderNavbar onSelectFilter={setCurrentFilters} filtersToShow={filtersToShow}/>
      <div className="order-list-container flex">
        <div className="heading">
          <div className="heading-item">Order ID</div>
          <div className="heading-item">Total Amount</div>
          <div className="heading-item">Status</div>
          <div className="heading-item">Action</div>
        </div>
        <hr/>

        {filteredOrderList.length > 0?
          filteredOrderList.map((item, index)=>{
          return(
          <React.Fragment key={item._id}>
            <div className="order-item-container" key={index}>
              <div className="data-item">
                <div className="data-item">Order ID: {item._id}</div>
                <div className="data-item">{formatDate(item.createdAt)}</div>
              </div>
              <div className="data-item">
                {item.totalPrice}
              </div>
              <div className="data-item">
                {statusDescriptions[item.orderStatus]}
              </div>
              {item.orderStatus === "ready_for_pickup" ? 
                <div className="order-action flex">
                  <button 
                    className='order-button red btn' 
                    onClick={()=>updateOrderStatus(item._id, 'on_the_way')}
                  >
                    On the Way
                  </button>
                </div>
              : item.orderStatus === "on_the_way"? 
                <div className="order-action flex">
                  <button 
                    className='order-button red btn' 
                    onClick={()=>updateOrderStatus(item._id, 'delivered')}
                  >
                    Delivered
                  </button>
                </div>
              : <div></div>
              }
              <Link href={`/OrderDetails/${item._id}`} className="order-icon">
                  <MdContentPaste />
              </Link>
            </div>
            <hr/>
          </React.Fragment>
          )
        })
        : (  
            <div className="no-order flex">
              <div className='grey-box'></div>
              <div>OPPS! No orders yet!</div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default DeliveryOrderList