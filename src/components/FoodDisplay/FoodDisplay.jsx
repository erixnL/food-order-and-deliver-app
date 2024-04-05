'use client';
import React, { useContext } from 'react';
import "./FoodDisplay.css"
import { AppContext } from '@/Context/AppContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category}) => {
  const {food_list} = useContext(AppContext);

  return (
    <div className="food-display" id="food-display">
      <div className="food-display-list">
        {food_list.map((item, index) => {
          return <FoodItem 
            key = {index}
            id = {item._id}
            name = {item.name}
            price = {item.price}
            image = {item.image}
          />
        })}
      </div>
    </div>
  )
}

export default FoodDisplay