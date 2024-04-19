'use client'
import React, { useContext } from 'react'
import "./PlaceOrder.css"
import { CiLocationOn, CiCreditCard1 } from "react-icons/ci";
import { FaRegDotCircle } from "react-icons/fa";
import Link from "next/link";
import { AppContext } from '@/Context/AppContext';


const PlaceOrder = () => {
  const {cartItems, food_list, getCartTotal} = useContext(AppContext);

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
          <div className="order-item-details ">
            {food_list.map((item, index) => {
              if(cartItems[item._id]>0){
                return(
                  <div className="order-item flex" key={item._id}>
                    <div>{item.name}</div>
                    <div>${item.price*cartItems[item._id]}
                    </div>
                  </div>
                )                
              }
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
            <div className="text flex">
              <div>Monthly plan</div>
              <div>$9.99/month</div>
            </div>
          </div>
        </div>
        <div className="second-box flex">
          <div className="order-label">
              Order total
          </div>
          <div className="order-total">
            <div>Subtotal</div>
            <div>${getCartTotal()}</div>
            <div>Delivery Fee</div>
            <div>$0</div>
            <div>Service Fee</div>
            <div>${getCartTotal()*0.005}</div>
          </div>
          <hr/>
          <div className="order-label grand-total flex">
              <div>Grand total</div>
              <div>${Math.round((getCartTotal()*1.005+0)*100)/100}</div>
          </div>
          <div className="order-button flex">
            <button className="placeorder btn"><Link href={"/Payment"}>Place order</Link></button>
            <button className="cancel btn"><Link href={"/Cart"}>Cancel</Link></button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default PlaceOrder