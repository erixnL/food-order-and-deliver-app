'use client'
import React, { useEffect, useState } from 'react'
import "./Profile.css"
import { FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'
import Image from 'next/image'
import { useSession } from "next-auth/react";


const Profile = () => {
  const { data: session, status } = useSession();
  console.log(session);

  return (
    <div className='profile flex'>
      <Link href={"/"}><div className="back">&lt; Back to Home Page</div></Link>
      {status === 'authenticated' && session ? (
        <><h2>Profile</h2><div className="first flex">
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
            Phone Number
          </div>
          <div className="user-detail">
            <input type="text" value={session.user.phone} />
          </div>
          <div className="lable">
            Email
          </div>
          <div className="user-detail">
            <input type="text" value={session.user.email} />
          </div>
          <button className="btn">Save</button>
        </div><div className="second flex">
            <div className="text flex">
              <div>Password</div>
              <div>................</div>
              <div>Last changed December 23, 2023</div>
            </div>
            <div className="icon"><FaArrowRight color="#7B7474" size="30" /></div>
          </div>
          <div className="third flex">
            {
              session?.user?.membership !== 'none' ?
              <>
              <div className="text flex">
                <div>Membership</div>
                <div className='details'>
                  <div>Start from</div>
                  <div>17 December 2023</div>
                  <div>Plan</div>
                  <div>Monthly</div>
                  <div>Next Bill date</div>
                  <div>17 June, 2024</div>
                </div>
                <div className="membership-btns flex">
                  <button classname="membership-btn btn">Renew</button>
                  <button classname="membership-btn btn">Cancel</button>
                </div>
              </div>
              <div className="icon"><FaArrowRight color="#7B7474" size="30" /></div>
              </>
              : 
              <div className="text flex">
                <div>Welcome to join our membership!</div>
                <div className="membership-btns flex">
                  <button classname="membership-btn btn">Join</button>
                </div>

              </div>
            }
            
          </div>
        </>) : (
          <div>
          </div>
        )}
    </div>
  )
}

export default Profile