'use client'
import React, { useContext } from 'react'
import "./ProfileMenu.css"
import { AppContext } from '@/Context/AppContext';
import Link from 'next/link';
import Image from 'next/image';


const ProfileMenu = () => {

  // const {isLogin, setShowProfileMenu, userRole} = useContext(AppContext);
  // const {isLogin, setShowProfileMenu, userRole} = useContext(AppContext);

    return (
    <div className="profile-menu flex">
      <div className="userInfo flex">
        <Image src='/assets/food_18.png' alt="" className="user-image" />
        <div className="text flex">
          <div className="name">Kathy</div>
          <div className="membership">Membership</div>
        </div>
      </div>
      <div className="user-menu flex">
        <Link to="/profile">
          <div onClick={()=>setShowProfileMenu(false)}>Profile</div>
        </Link>
        {userRole === "customer"
          ?
          <Link to="/orderhistory">
            <div onClick={()=>setShowProfileMenu(false)}>Order History</div>
          </Link>
          :
          ""
        }
        
        {userRole === "customer"
          ?
          <Link to="/orderhistory">
            <div onClick={()=>setShowProfileMenu(false)}>Order History</div>
          </Link>
          :
          ""
        }
        
      </div>
      <div onClick={function(event){isLogin(prev => false);setShowProfileMenu(false) }} className="sign-out">Sign out</div>
    </div>
  )
}

export default ProfileMenu