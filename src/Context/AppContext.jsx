'use client';
import React, { createContext } from "react";
import { Restaurant_list, food_list, order_list } from "../../public/assets/images/assets";
import { useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = (props) => {

  const [cartItems, setCartItems] = React.useState({});

  const [Login, isLogin] = React.useState(true);

  const [userRole, setUserRole] = React.useState(null);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const [orderDelivered, setOrderDelivered] = useState(true);

  const [showRating, setShowRating] = useState(false);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

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
    Login, 
    isLogin,
    showProfileMenu, 
    setShowProfileMenu,
    orderDelivered, 
    setOrderDelivered,
    showRating, 
    setShowRating,
    userRole, 
    setUserRole
  }

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContextProvider;