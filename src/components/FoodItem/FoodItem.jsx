'use client';
import React, { useContext, useEffect, useState } from 'react';
import "./FoodItem.css";
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { AppContext } from '@/Context/AppContext';
import Image from 'next/image';
import image1 from "../../../public/assets/images/food_15.png"


const FoodItem = ({id, name, itemPrice, restaurant }) => {
  const {cartItems, setCartItems} = useContext(AppContext);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    if (cartItems[id]) {
      setItemCount(cartItems[id].quantity);
    } else {
      setItemCount(0);  // Ensure it's set to zero if the item is not in the cart
    }
  }, [cartItems, id]);

  console.log("ItemCount", itemCount)
  console.log("cartItem", cartItems)

  const modifyCart = async (method, itemId, quantity) => {
    let url;
    switch (method) {
      case 'POST':
        url = '/api/cart/addToCart'; // Endpoint for adding items
        break;
      case 'PATCH':
        url = '/api/cart/updateCart'; // Endpoint for updating items
        break;
      case 'DELETE':
        url = '/api/cart/deleteFromCart'; // Endpoint for deleting items
        break;
      default:
        throw new Error('Invalid method');
    }

    try {
      const response = await fetch(url, {
        // method: method.toUpperCase(),
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          itemId,
          quantity,
          itemName: name,
          price: itemPrice,
          restaurant
        })
      });

      if (response.ok) {
        updateLocalState(method, itemId, quantity);
      } else {
        const errorData = await response.text();
        throw new Error(errorData.error || 'Failed to modify the cart');
      }
    } catch (error) {
      console.error('Error modifying the cart:', error);
    }
  };

    // try {
    //   const response = await fetch('/api/cart', { // API endpoint to update the cart
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //           itemId,
    //           quantity,
    //           itemName,
    //           price,
    //           restaurant
    //       })
    //   });
    //   const data = await response.json();
    //   if (response.ok) {
    //       setCartItems(prev => ({ 
    //         ...prev, 
    //         [itemId]: {
    //           itemId,
    //           quantity,
    //           itemName,
    //           price,
    //           restaurant
    //         }
    //       })); // Update local state with the new quantity
    //   } else {
    //       throw new Error(data.error || 'Failed to add item to cart');
    //   }
    // } catch (error) {
    //     console.error('Error adding item to cart:', error);
    // }

  const updateLocalState  = (method, itemId, quantity) => {
    setCartItems(prevItems => {
      const updatedItems = { ...prevItems };
      if (method === 'POST' || method === 'PATCH') {
        updatedItems[itemId] = { 
          ...updatedItems[itemId],
          quantity,
          itemName: name, 
          price: itemPrice, 
          restaurant
        };
      } else if (method === 'DELETE') {
        delete updatedItems[itemId];
      }
      return updatedItems;
    });
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
            ? <button className="btn" onClick = {() => modifyCart('POST', id, 1)}>
                Add to cart
              </button>
            : <div className="food-item-counter flex" >
                  <IoIosAddCircleOutline
                  className="icon" 
                  size={30}
                  color="green"
                  onClick = {() => modifyCart('PATCH', id, itemCount + 1)}
                  />
                <div>{cartItems[id].quantity}</div>
                <CiCircleMinus 
                  className="icon" 
                  size={30}
                  color="red"
                  onClick = {() => itemCount > 1 ? modifyCart('PATCH', id, itemCount - 1) : modifyCart('DELETE', id)}
                /> 
              </div>
          }
 
        </div>
      </div>     
    </div>
  )
}

export default FoodItem