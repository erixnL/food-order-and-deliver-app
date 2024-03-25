import React from 'react'
import "./RestCard.css"
import { GiRoundStar } from "react-icons/gi";


const RestCard = ({id, name, rating, image}) => {
  return (
    <div className='rest-card'>
      <div className="rest-image-container">
        <img className='rest-image' src={image} alt="" />
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

    </div>
  )
}

export default RestCard