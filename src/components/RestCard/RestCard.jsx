'use client';
import React from 'react'
import "./RestCard.css"
import { GiRoundStar } from "react-icons/gi";
import Image from 'next/image';
import image1 from "../../../public/assets/images/food_18.png"
import Link from 'next/link';



const RestCard = ({id, name, rating}) => {

  return (
    <div className='rest-card'>
      <Link href={`/restaurants/${id}`}>
        <div className="rest-image-container">
          <Image className='rest-image' src={image1} alt="restaurant-image" />
        </div>
        <div className="rest-info flex">
          <div className="rest-name">
            <p>{name}</p>
          </div>
          <div className="rest-rating flex">
            <p>{rating}</p>
            <GiRoundStar color="orange" />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default RestCard