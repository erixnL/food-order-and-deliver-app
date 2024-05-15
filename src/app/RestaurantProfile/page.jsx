'use client'
import React, { useEffect, useState } from 'react'
import "./RestaurantProfile.css"
import { useSession } from 'next-auth/react';
import { FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Image from 'next/image';

const RestaurantProfile = () => {
  const { data: session, status } = useSession();
  console.log("RestProfile session data", session);
  
  const [restaurantData, setRestaurantData] = useState({});
  

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/api/restaurant/${session.user.restaurant}`);
        if (response.ok) {
          const data = await response.json();
          setRestaurantData(data);
        } else {
          console.error('Failed to fetch restaurant data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    if (status === 'authenticated' && session?.user?.userRole === 'restaurant') {
      console.log("Session restaurant ID:", session.restaurant);
      fetchRestaurantData();
      
    }
  }, [session, status]);

  console.log("RestProfile restaurantData", restaurantData);

  return (
    <div className='profile flex'>
      {/* <Link href={"/"}><div className="back">&lt; Back to Home Page</div></Link> */}
      {status === 'authenticated' && session ? (
      <>
        <h2>Restaurant Profile</h2>
        <div className="first flex">
          <div className="image-icon flex">
            <Image src="/assets/images/food_18.png" width="10" height="10" alt="" className="user-image" />
            <div className="icon"><FaEdit /></div>
          </div>
          <div className="lable">
            Name
          </div>
          <div className="user-detail">
            <input type="text" value={session.user.username} />
          </div>
          <div className="lable">
            Email
          </div>
          <div className="user-detail">
            <input type="text" value={session.user.email} />
          </div>
          <div className="lable">
            Restaurant Name
          </div>
          <div className="user-detail">
            <input type="text" value={restaurantData.name} />
          </div>
          <div className="lable">
            Restaurant Operating time
          </div>
          <div className="user-detail">
            <input type="text" value={restaurantData.openingHours} />
          </div>
          <div className="lable">
            Restaurant Address
          </div>
          <div className="user-detail">
            <input type="text" value={restaurantData.address} />
          </div>
          <button className="btn">Save</button>
        </div>
        <div className="second flex">
            <div className="text flex">
              <div>Password</div>
              <div>................</div>
              <div>Last changed December 23, 2023</div>
            </div>
            <div className="icon"><FaArrowRight color="#7B7474" size="30" /></div>
          </div>
        </>) 
        : (
          <div>
          </div>
        )}
    </div>
  )
}

export default RestaurantProfile