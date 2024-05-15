'use client'
import React, { useContext } from 'react'
import "./ProfileMenu.css"
import { AppContext } from '@/Context/AppContext';
import Link from 'next/link';
import Image from 'next/image';
import {signOut, useSession} from "next-auth/react";


const ProfileMenu = () => {

  const {setShowProfileMenu} = useContext(AppContext);
  const { data: session, status } = useSession(); 


    return (
    <div className="profile-menu flex">
      <div className="userInfo flex">
        {/* <Image 
          src='.././assets/food_18.png'
          width={5}   // Specify the width of the image
          height={5}  // Specify the height of the image
          layout="responsive"  // Optional: makes the image scale with the parent element 
          alt="" className="user-image" 
        /> */}
        <div className="text flex">
          <div className="name">{session.user.username}</div>
          {/* <div className="membership">Membership</div> */}
        </div>
      </div>
      <div className="user-menu flex">
        <Link href={"/UserProfile"}>
          <div onClick={()=>setShowProfileMenu(false)}>Profile</div>
        </Link>

        {status === 'authenticated' && session.user.userRole === "customer"
          ?
          <Link href={"/OrderHistory"}>
            <div onClick={()=>setShowProfileMenu(false)}>Order History</div>
          </Link>
          :
          ""
        }
        
      </div>
      <div onClick={function(event){signOut({callbackUrl: '/'  // URL to redirect to after sign out
    });setShowProfileMenu(false) }} className="sign-out">Sign out</div>
    </div>
  )
}

export default ProfileMenu