'use client';
import React, { useContext, useEffect, useState } from 'react';
import "./FoodItem.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { AppContext } from '@/Context/AppContext';
import Image from 'next/image';
import image1 from "../../../public/assets/images/food_15.png"
import { useSession } from 'next-auth/react';


const FoodItem = ({id, name, itemPrice, restaurant, restaurantId }) => {
  const {cartItems, setCartItems} = useContext(AppContext);
  const [itemCount, setItemCount] = useState(0);
  const { data: session, status } = useSession();

  console.log("Session from FoodItem:",session?.user)
  const userId = session?.user?.id;

  useEffect(() => {
    if (cartItems[id]) {
      setItemCount(cartItems[id].quantity);
    } else {
      setItemCount(0);  // Ensure it's set to zero if the item is not in the cart
    }
  }, [cartItems, id]);

  console.log("ItemCount", itemCount)
  console.log("cartItem from FoodItem", cartItems)

  const modifyCart = async (itemId, quantity) => {
    const newItem = {
      itemId,
      quantity,
      itemName: name,
      price: itemPrice,
      restaurantName: restaurant,
      restaurantId
    };
    // Update local state first
    const newCartItems = { ...cartItems, [itemId]: newItem };
    if (quantity === 0) {
      delete newCartItems[itemId];
    }
    setCartItems(newCartItems);
    
    try {
      if(userId){
        const response = await fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, newItems: Object.values(newCartItems) })
        });
      }else{
        console.log("No userId found");
      }
      

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData.error || 'Failed to modify the cart');
      }
    } catch (error) {
      console.error('Error modifying the cart:', error);
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
          {itemCount === 0
            ? <button className="btn" onClick = {() => modifyCart(id, 1)}>
                Add to cart
              </button>
            : <div className="food-item-counter flex" >
                  <IoIosAddCircleOutline
                  className="icon" 
                  size={30}
                  color="green"
                  onClick = {() => modifyCart(id, itemCount + 1)}
                  />
                <div>{cartItems[id] ? cartItems[id].quantity : 0}</div>
                <CiCircleMinus 
                  className="icon" 
                  size={30}
                  color="red"
                  onClick = {() => modifyCart(id, Math.max(0, itemCount - 1))}
                /> 
              </div>
          }
 
        </div>
      </div>     
    </div>
  )
}

export default FoodItem