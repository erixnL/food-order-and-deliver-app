'use client';
import React, { useContext } from 'react';
import "./RestDisplay.css";
import RestCard from '../RestCard/RestCard';
import { AppContext } from '@/Context/AppContext';

const RestDisplay = ({category}) => {

  const {Restaurant_list} = useContext(AppContext);
   return (
    <div className='rest-display' id='rest-display' role='restaurant-list'>
      <h2>{category}</h2>
      <div className="rest-display-list">
        {Restaurant_list.map((item, index) => {
          return <RestCard 
              key={index}
              id={item._id}
              name={item.name}
              rating={item.rating}
              image={item.image}
            />
        })}
      </div>
    </div>
  )
}

export default RestDisplay