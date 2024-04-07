'use client';
import React, { useContext } from 'react';
import "./FoodItem.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { AppContext } from '@/Context/AppContext';
import Image from 'next/image';


const FoodItem = ({id, name, price, image}) => {
  const {cartItems, addToCart, removeFromCart} = useContext(AppContext);

  return (
    <div className='food-item flex'>
       <div className="food-item-image-container">
        <Image className = 'food-item-image' src={image} alt="" />
      </div>
      <div className="food-item-info flex">
        <div className="food-item-name">
          {name}
        </div>
        <div className="food-item-price">
          ${price}
        </div>
        <div className="food-item-icons">
          {!cartItems[id]
            ? <button className="btn" onClick = {() => addToCart(id)}>
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