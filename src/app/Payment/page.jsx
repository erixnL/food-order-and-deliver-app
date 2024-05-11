'use client'
import React, { useContext } from 'react'
import "./Payment.css"
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { AppContext } from '@/Context/AppContext'

const Payment = () => {
  const { data: session, status } = useSession();
  const { currentOrder, setCurrentOrder} = useContext(AppContext);
  console.log("currentOrder", currentOrder);

  const handlePayment = async () => {
    if (!session) {
      alert('You must be logged in to place an order.');
      return;
    }
    const items = currentOrder.items.map(item => ({
      itemId: item.itemId,
      menuItem: item.itemName, // Assuming itemName should be mapped to menuItem
      quantity: item.quantity,
      price: item.price
    }));

    const orderDetails = {
      userId: session?.user.id,  
      items: items,
      serviceFee: currentOrder.serviceFee, 
      restaurantId: currentOrder.items[0].restaurantId, 
      restaurantName: currentOrder.items[0].restaurantName, 
      deliveryAddress: "U4, 15 Simith Street, Wollongong",
      totalPrice: currentOrder.total  
    };
    console.log("Checkout", orderDetails);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails)
      });

      const result = await response.json();
      if (response.ok) {
        alert('Order placed successfully!');
        setCurrentOrder({});
        clearCart(session?.user.id);
        window.location.href = '/';
        
      } else {
        throw new Error('Failed to place order');

      }
    } catch (error) {
      console.error('Failed to post new order:', error);
      alert('Error placing order: ' + error.message);
    }
  };

  const clearCart = async (userId) => {
    const body = {
        userId: userId,
        newItems: []  
    };

    try {
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();
        if (response.ok) {
            alert('Cart cleared successfully:', data);
        } else {
            console.error('Failed to clear cart:', data);
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
    }
}



  return (
    <div className='payment flex'>
      <div className="back-to-order"><Link href={"/PlaceOrder"}>&lt; Back to order</Link></div>
      <h2>Payment</h2>
      {status === 'authenticated' && session && session.user ? (
      <>
        <div className='payment-label'>Card Number:</div>
        <div className="card-number" >
          <input type="text" value={session.user.payment.cardNumber} readOnly/>
        </div>
        <div className="card-expirydate flex">
          <div className='payment-label'>Card Expiry Date:</div>
          <div className='payment-label'>Card Security Number:</div>
        </div>
        <div className="card-expirydate flex">
          <input type="text" value={session?.user.payment.cardExpiry} readOnly/>
          <input type="number" value={session?.user.payment.cardCVV} readOnly/>
        </div>
        <div className='payment-label'>Card Owner Name:</div>
        <div className="card-name">
          <input type="text" value={session?.user.username} readOnly/>
        </div>
        <button className='payment-btn btn' onClick={handlePayment}>Pay</button>
      </>
      ) :
      (
        <>
        </>
      ) }
    </div>
  )
}

export default Payment