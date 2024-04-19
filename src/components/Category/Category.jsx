'use client';
import React from 'react'
import "./Category.css"
import { categories } from '@/public/assets/images/assets';
import Image from 'next/image';

const Category = ({category, setCategory}) => {
  
  return (
    <div className="header" id="header flex" role="categories">
      <div className="categories-list flex">
        {categories.map((item, index) => {
          return (
            <div 
              onClick={() => setCategory(
                prev => prev === item.category_name
                ? "All" : item.category_name
              )}
              key={index} 
              className="categories-list-item"
            >
              <Image className={category===item.category_name?"active":""} 
                src={item.category_image} alt="" />
              <p>{item.category_name}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Category