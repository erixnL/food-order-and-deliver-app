'use client';
import React, { useContext, useEffect } from 'react';
import "./Cart.css";
import { AppContext } from '@/Context/AppContext';
import Image from 'next/image';
import Link from 'next/link'
import { useSession } from 'next-auth/react';

const Cart = () => {

  const {cartItems, food_list, removeFromCart, getCartTotal} = useContext(AppContext);
  const { data: session, status } = useSession();

  return (
    getCartTotal() 
      ? (
        <div className='cart flex'>
          <div className="cart-items flex">
            {food_list.map((item, index) => {
              if(cartItems[item._id]>0){
                return (
                  <div className="item-container" key={item._id}>
                    <div className="cart-item ">
                      <div className="cart-items-image">
                        <Image src={item.image} alt="" />
                      </div>
                      <div className="cart-items-info flex">
                        <div className="cart-item-restaurant">
                          {/* to be replaced by restaurant name */}
                          {item.category} 
                        </div>
                        <div className="cart-item-name">
                          {item.name}
                        </div>
                        <div className="cart-item-price">
                          ${item.price*cartItems[item._id] }
                        </div>
                      </div>
                      <div className="cart-item-quantities flex">
                        <div className="cart-item-quantity">
                          x {cartItems[item._id]}
                        </div>
                        <div className="cart-item-remove">
                          <button onClick={()=>removeFromCart(item._id)}className='btn'>Remove</button>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>

                )
              }
            })}

          </div>
          <div className="cart-amount flex">
            <p>Subtotal</p>
            <p>${getCartTotal()}</p>
          </div>
          <div className="cart-checkout">
            <Link href={"/placeorder"}><button className='btn'>Go to Checkout</button></Link>
          </div>
        </div>
      ) 
      : (
        <div className="text-container flex">
          <div className='grey-box'></div>
          <div>OPPS! No items</div>
          <div>Add items to the cart!</div>
          <Link href={"/"}><button className='btn'>Start shopping</button></Link>
        </div>
      )    
  )
}

export default Cart