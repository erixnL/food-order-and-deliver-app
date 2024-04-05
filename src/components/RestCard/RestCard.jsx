'use client';
import React from 'react'
import "./RestCard.css"
import { GiRoundStar } from "react-icons/gi";
import Image from 'next/image';
import { Link } from 'react-router-dom';


const RestCard = ({id, name, rating, image}) => {

  return (
    <div className='rest-card'>
      <Link to={id}>
        <div className="rest-image-container">
          <Image className='rest-image' src={image} alt="" />
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