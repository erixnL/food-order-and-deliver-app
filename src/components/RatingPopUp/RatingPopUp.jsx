import React, { useContext } from 'react'
import "./RatingPopUp.css"
import { FaStar } from "react-icons/fa";
import { AppContext } from '../../Context/AppContext';


const RatingPopUp = () => {
  const[rating, setRating] = React.useState(null);
  const[hover, setHover] = React.useState(null);
  const {setShowRating} = useContext(AppContext);

  return (
    <div className='ratingPopUp'>
      <div className="ratingpopup-container flex">
        <h2>How is your order?</h2>
        <div className="star-container flex">
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return(
              // eslint-disable-next-line react/jsx-key
              <label>
                <input 
                 type="radio"
                 name="rating"
                 value={currentRating}
                 onClick={()=>setRating(currentRating)}
                 key={index}
                />
                <FaStar 
                className='star'
                 size="50"
                 color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                />
              </label>
              
            )
          })
          }
          
          
        </div>
        <div className="comment">
          <textarea name="restaurant-review" id="restaurant-review" cols="40" rows="5" placeholder='Review the restaurant'></textarea>
        </div>
        <button className="btn" onClick={()=>setShowRating(false)}>Summit</button>
      </div>
    </div>
  )
}

export default RatingPopUp