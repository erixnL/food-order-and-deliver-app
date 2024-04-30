'use client';
import React, { useContext } from 'react';
import "./FoodItem.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { AppContext } from '@/Context/AppContext';
import Image from 'next/image';
import image1 from "../../../public/assets/images/food_15.png"


const FoodItem = ({id, name, itemPrice, restaurant }) => {
  const {cartItems, setCartItems, removeFromCart} = useContext(AppContext);

  const addToCart = async (itemId, itemName, price, restaurant) => {
    const quantity = cartItems[itemId] ? cartItems[itemId] + 1 : 1;

    try {
      const response = await fetch('/api/cart/addToCart', { // API endpoint to update the cart
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              itemId,
              quantity,
              itemName,
              price,
              restaurant
          })
      });
      const data = await response.json();
      if (response.ok) {
          setCartItems(prev => ({ 
            ...prev, 
            [itemId]: {
              itemId,
              quantity,
              itemName,
              price,
              restaurant
            }
            
          })); // Update local state with the new quantity
      } else {
          throw new Error(data.error || 'Failed to add item to cart');
      }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
  };


  return (
    <div className='food-item flex'>
       <div className="food-item-image-container">
        <Image className = 'food-item-image' src={image1} alt="" />
      </div>
      <div className="food-item-info flex">
        <div className="food-item-name">
          {name}
        </div>
        <div className="food-item-price">
          ${itemPrice}
        </div>
        <div className="food-item-icons">
          {!cartItems[id]
            ? <button className="btn" onClick = {() => addToCart(id, name, itemPrice, restaurant)}>
                Add to cart
              </button>
            : <div className="food-item-counter flex" >
                  <IoIosAddCircleOutline
                  className="icon" 
                  size={30}
                  color="green"
                  onClick = {() => addToCart(id)}
                  />
                <div>{cartItems[id]}</div>
                <CiCircleMinus 
                  className="icon" 
                  size={30}
                  color="red"
                  onClick = {() => removeFromCart(id)}
                /> 
              </div>
          }
 
        </div>
      </div>     
    </div>
  )
}

export default FoodItem