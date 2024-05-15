'use client'
import React, { useContext, useEffect, useState } from 'react'
import "./PlaceOrder.css"
import { CiLocationOn, CiCreditCard1 } from "react-icons/ci";
import { FaRegDotCircle } from "react-icons/fa";
import Link from "next/link";
import { AppContext } from '@/Context/AppContext';
import { useSession } from 'next-auth/react';


const PlaceOrder = () => {
  const {cartItems, getCartTotal, setCurrentOrder} = useContext(AppContext);
  const { data: session, status } = useSession();
  const [navigate, setNavigate] = useState(false);

  useEffect(() => {
    if (navigate) {
      const link = document.getElementById('autoNavigateLink');
      link && link.click();
    }
  }, [navigate]);

  const placeOrder = () => {
    const orderTotal = session?.user.membership !== "none" 
      ? (getCartTotal() + 1.99) 
      : (getCartTotal() * 1.005 + 1.99);

    
    const currentOrder = {
      items: Object.values(cartItems),
      subtotal: getCartTotal(),
      serviceFee: session?.user.membership !== "none" ? 0 : (getCartTotal() * 0.005),
      deliveryFee: 1.99,
      total: orderTotal
    };
    setCurrentOrder(currentOrder);
    setNavigate(true);
  }

  return (
    <div className='place-order flex'>
      
      <div className="back-to-order"><Link href={"/Cart"}>&lt; Back to your cart</Link></div>
      
      <div className="boxes flex">
        <div className="first-box flex">
          <div className="order-label">
            Delivery details
          </div>
          <div className="order-details flex">
            <div className="icon">
              <CiLocationOn />
            </div>
            <div className="text">U12  88 Smith street wollongong NSW 2500</div>
          </div>
          <hr/>
          <div className="order-label">
            Payment details
          </div>
          <div className="order-details flex">
            <div className="icon">
              <CiCreditCard1 />
            </div>
            <div className="text flex">
              <div>Credit/Debit card</div>
              <div>UnionPay **** 3412</div>
            </div>
          </div>
          <hr/>
          <div className="order-label">
            Order Summary
          </div>
          <div className="order-item-details flex">
            {Object.values(cartItems).map((item, index) => {
              return(
                <div className="order-item flex" key={item.itemId}>
                  <div>{item.itemName}</div>
                  <div>${(item.price*item.quantity).toFixed(2)}
                  </div>
                </div>
              )                
            })}
            
          </div>
          <hr/>
          <div className="order-label">
            Membership
          </div>
          <div className="membership-details flex">
            <div className="icon">
              <FaRegDotCircle size="15"/>
            </div>
            {
              session?.user.membership !== "none" ?
              <div className="text flex">
                <div>Monthly plan</div>
                <div>$9.99/month</div>
              </div>
              : <div className="text flex">
                  <div>Welcome to join our membership!</div>
                </div>

            }
            
          </div>
        </div>
        <div className="second-box flex">
          <div className="order-label">
              Order total
          </div>
          <div className="order-total">
            <div>Subtotal</div>
            <div>${getCartTotal().toFixed(2)}</div>
            <div>Delivery Fee</div>
            <div>$1.99</div>
            <div>Service Fee</div>
            <div>${session?.user.membership !== "none" ? 0 : (getCartTotal()*0.005).toFixed(2)}</div>
          </div>
          <hr/>
          <div className="order-label grand-total flex">
              <div>Grand total</div>
              <div>${session?.user.membership !== "none" ? (getCartTotal()+1.99).toFixed(2) : (getCartTotal()*1.005+1.99).toFixed(2)}</div>
          </div>
          <div className="order-button flex">
            <button className="placeorder btn" onClick={placeOrder}>Place order</button>
            {navigate && (
              <Link href="/Payment" legacyBehavior>
                <a id="autoNavigateLink" style={{ display: 'none' }}>Navigate</a>
              </Link>
            )}
            <button className="cancel btn"><Link href={"/Cart"}>Cancel</Link></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder