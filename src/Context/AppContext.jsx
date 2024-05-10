'use client';
import React, { createContext, useEffect, useState } from "react";
import { Restaurant_list, food_list, order_list } from '../../public/assets/images/assets';
import { useSession } from 'next-auth/react';

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

  const [cartItems, setCartItems] = React.useState({});

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [orderDelivered, setOrderDelivered] = useState(true);

  const [showRating, setShowRating] = useState(false);

  const [orderHistory, setOrderHistory] = useState([]);

  const [currentOrder, setCurrentOrder] = useState({});

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getCartTotal = () => {
    let totalAmount = 0;
    for (const item of Object.values(cartItems)) {
      if (item.quantity > 0) {
        totalAmount += item.price * item.quantity;
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
    removeFromCart,
    getCartTotal,
    showProfileMenu, 
    setShowProfileMenu,
    orderDelivered, 
    setOrderDelivered,
    showRating, 
    setShowRating,
    orderHistory, 
    setOrderHistory,
    currentOrder, 
    setCurrentOrder

  }

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;