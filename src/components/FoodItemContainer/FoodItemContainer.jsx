import React, { useContext } from 'react'
import "./FoodItemContainer.css"
import { AppContext } from '@/Context/AppContext';
import image1 from "../../../public/assets/images/food_18.png"
import Image from 'next/image';


const FoodItemContainer = ({ restaurant, itemName, price, quantity,itemId }) => {

  const { removeFromCart} = useContext(AppContext);

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
            ${price * quantity }
          </div>
        </div>
        <div className="cart-item-quantities flex">
          <div className="cart-item-quantity">
            x {quantity}
          </div>
          <div className="cart-item-remove">
            <button onClick={()=>removeFromCart(itemId)}className='btn'>Remove</button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  )
}

export default FoodItemContainer