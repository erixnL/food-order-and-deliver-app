'use client';
import React, { useContext } from 'react';
import "./Cart.css";
import { AppContext } from '@/Context/AppContext';

const Cart = () => {

  return (
    <div>Cart</div>
  )
  const {cartItems, food_list, removeFromCart, getCartTotal} = useContext(AppContext);

  return (
    <div className='cart flex'>
      {/* <div className="restaurant-clearall">
        Clear all
      </div> */}
      <div className="cart-items flex">
        {food_list.map((item, index) => {
          if(cartItems[item._id]>0){
            return (
              <div className="item-container">
                <div className="cart-item ">
                  <div className="cart-items-image">
                    <img src={item.image} alt="" />
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
      <div className="cart-amount flex">
        <p>Delivery fee</p>
        <p>$10</p>
      </div>
      <div className="cart-total flex">
        <p>Total</p>
        <p>${getCartTotal()+10}</p>
      </div>
      <div className="cart-checkout">
        <button className='btn'>Go to Checkout</button>
      </div>
    </div>
  )
}

export default Cart