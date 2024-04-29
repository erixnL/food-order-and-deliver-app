'use client';
import React, { createContext, useEffect, useState } from "react";
import { Restaurant_list, food_list, order_list } from '../../public/assets/images/assets';
import { useSession } from 'next-auth/react';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {
  const { data: session } = useSession(); // Retrieve session data

  const [cartItems, setCartItems] = React.useState({});

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [orderDelivered, setOrderDelivered] = useState(true);

  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    if (session && session.cart && session.cart.items) {
      // Assuming session.cart.items is an array and needs to be transformed to an object
      const newCartItems = session.cart.items.reduce((acc, item) => {
        acc[item.id] = (acc[item.id] || 0) + item.quantity;
        return acc;
      }, {});
      setCartItems(newCartItems);
    }
  }, [session]);

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
          setCartItems(prev => ({ ...prev, [itemId]: quantity })); // Update local state with the new quantity
      } else {
          throw new Error(data.error || 'Failed to add item to cart');
      }
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
  };
    // if (!cartItems[itemId]) {
    //   setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    // } else {
    //   setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    // }


  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list,
    Restaurant_list,
    order_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartTotal,
    showProfileMenu, 
    setShowProfileMenu,
    orderDelivered, 
    setOrderDelivered,
    showRating, 
    setShowRating
  }

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;