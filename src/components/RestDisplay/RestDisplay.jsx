'use client';
import React, { useContext } from 'react'
import "./RestDisplay.css";
import { RestContext } from '../../Context/RestContext';
import RestCard from '../RestCard/RestCard';

const RestDisplay = ({category}) => {

  const {Restaurant_list} = useContext(RestContext)
   return (
    <div className='rest-display' id='rest-display'>
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