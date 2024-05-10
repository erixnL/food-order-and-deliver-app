'use client'
import { usePathname } from 'next/navigation';
import "./restaurant.css"
import React, { useEffect, useState } from 'react';
import FoodItem from '@/components/FoodItem/FoodItem';
import Image from 'next/image';
import image1 from "../../../../public/assets/images/food_13.png"
import { GiRoundStar } from "react-icons/gi";

export const client = true; // This explicitly marks the component as a client component

const RestaurantPage = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop();


  const [menu, setMenu] = useState([]);
  const [restaurant, setRestaurant] = useState({});

  // You can use this 'id' to fetch restaurant details from an API
  useEffect(()=> {
      const fetchRestaurants = async () => {

          const response = await fetch(`/api/restaurant/${id}`)
          const data = await response.json()
          console.log("Fetched data from restaurant page:", data)

          setRestaurant(data);
          setMenu(data.menu);

      }
      fetchRestaurants();
      
  }, [id])
  console.log("restaurant", restaurant);
  console.log("restaurant menu", menu);

  return (
    <div className="food-display" id="food-display">
      {/* <div className="banner"><Image src={image2}/></div> */}
      <div className="restaurant-details">
        <div className="restaurant-name-container">
          <Image className="restaurant-image" src={image1}/>
          <div className="restaurant-name">{restaurant.name}</div>
        </div>
        <div className="restaurant-info">
          <div className="restaurant-address">{restaurant.address}</div>
          <div className="second-row">
            <div className="restaurant-ratings">
              {restaurant.ratings?.averageRating}
              <GiRoundStar color="orange" /> 
              ({restaurant.ratings?.totalReviews} ratings)
              
            </div>
            <div className="operating-time">
              Operating Time {restaurant.openingHours}
            </div>
          </div>

        </div>
      </div>
      <div className="food-display-list">
        {menu.map((item, index) => {
          return <FoodItem 
            key = {index}
            id = {item._id}
            name = {item.name}
            itemPrice = {item.price}
            restaurant= {restaurant.name}
            restaurantId = {restaurant._id}
          />
        })}
      </div>
    </div>
  );
};

export default RestaurantPage;