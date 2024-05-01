'use client';
import React, { useContext, useEffect } from 'react';
import "./Cart.css";
import { AppContext } from '@/Context/AppContext';
import Link from 'next/link'
import FoodItemContainer from '@/components/FoodItemContainer/FoodItemContainer';

const Cart = () => {

  const {cartItems, getCartTotal} = useContext(AppContext);
  console.log('CartItems from cart page:',cartItems);
  console.log ('Object.values:',Object.values(cartItems));

  const updateQuantity = async (e) => {
    //should have a form here
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    Object.keys(cartItems).length > 0  
      ? (
        <div className='cart flex'>
          <div className="cart-items flex">
            {Object.values(cartItems).map((item, index) => (

              <FoodItemContainer 
                key = {index}
                restaurant = {item.restaurant}
                itemId = {item.itemId}
                itemName = {item.itemName}
                price = {item.price}
                quantity = {item.quantity}
              />
            ))}

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