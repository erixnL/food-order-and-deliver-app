'use client'
import React, { useContext, useEffect, useState } from 'react'
import "./MenuList.css"
import Link from 'next/link'
import { AppContext } from '@/Context/AppContext'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import image1 from "../../../public/assets/images/food_13.png"
import { FaEdit } from "react-icons/fa";



const MenuList = () => {
  const { data: session, status } = useSession();
  console.log("MenuList session data", session);
  
  const [menuData, setMenuData] = useState([]);

  const restaurantId = session?.user?.restaurant;
  console.log("Session restaurant ID:", session?.user?.restaurant);
  
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(`/api/restaurant/${restaurantId}`);
        if (response.ok) {
          const data = await response.json();
          setMenuData(data.menu);
        } else {
          console.error('Failed to fetch restaurant data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    if (status === 'authenticated' && session?.user?.userRole === 'restaurant') {
      
      fetchRestaurantData();
      
    }
  }, [session, status]);

  console.log("MenuList menuData", menuData);


  return (
    <div className='menu-list flex' >
      <div className="menu-header flex">
        <h1>Menu</h1>
        <Link href="/AddNewMenu"><button className='menu-add-btn btn'>Add New Item</button></Link>
      </div>

      <div className="menu-list-container flex">
        <div className="heading flex">
          <div className="heading-item">Name</div>
          <div className="heading-item">Price</div>
        </div>
        <hr/>

        {menuData.map((item, index)=>{
          return(
            <>
            <div className="menu-item-container flex" key={index}>
              <div className="description-container flex">
                <Image className="menu-image" src={image1} width="50" height="50" alt="" /> 
                <div>{item.name}</div>
              </div>
              <div className="right flex">
                <div className="menu-price">${item.price.toFixed(2)}</div>
                <Link href={`/EditMenu/${item._id}`}><FaEdit /></Link>
              </div>
            </div>
            <hr/>
            </>
          )
        })
        }
      </div>
    </div>
  )
}

export default MenuList