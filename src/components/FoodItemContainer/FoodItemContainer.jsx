import React, { useContext } from 'react'
import "./FoodItemContainer.css"
import image1 from "../../../public/assets/images/food_18.png"
import Image from 'next/image';
import { AppContext } from '@/Context/AppContext';
import { useSession } from 'next-auth/react';


const FoodItemContainer = ({ restaurant, restaurantId, itemName, itemPrice, quantity, itemId }) => {
  const {cartItems, setCartItems} = useContext(AppContext);
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const modifyCart = async (itemId, quantity) => {
    const newItem = {
      itemId,
      quantity,
      itemName,
      price: itemPrice,
      restaurantName: restaurant,
      restaurantId
    };
    console.log("New Item", newItem);

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
    <div className="item-container" key={itemId}>
      <div className="cart-item ">
        <div className="cart-items-image">
          <Image src={image1} alt="" />
        </div>
        <div className="cart-items-info flex">
          <div className="cart-item-restaurant">
            {restaurant}
          </div>
          <div className="cart-item-name">
            {itemName}
          </div>
          <div className="cart-item-price">
            ${(itemPrice * quantity).toFixed(2)}
          </div>
        </div>
        <div className="cart-item-quantities flex">
          <div className="cart-item-quantity">
            x {quantity}
          </div>
          <div className="cart-item-remove">
            <button onClick={()=>modifyCart(itemId, 0)}className='btn'>Remove</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default FoodItemContainer