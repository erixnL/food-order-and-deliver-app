import React from 'react'
import "./Header.css"
import { categories } from '../../../src/Assets/assets'

const Header = ({category, setCategory}) => {
  return (
    <div className="header" id="header flex">
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
              <img className={category===item.category_name?"active":""} 
                src={item.category_image} alt="" />
              <p>{item.category_name}</p>
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Header