'use client'
import React from 'react'
import "./ProfileDeliveryPerson.css"
import { FaEdit } from "react-icons/fa";
// import photo from "../../Assets/profiledeliveryperson.png"
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { FaArrowRight } from "react-icons/fa";



const DeliveryProfile = () => {
  const { data: session, status } = useSession();
  return (
    <div className='profileDeliveryPerson flex'>
      <Link href="/"><div className="back">&lt; Back to Home Page</div></Link>
      <h2>Profile</h2>
      <div className="first flex">
        <div className="image-icon flex">
          {/* <img src={photo} alt="" className="user-image" /> */}
          <div className="icon"><FaEdit /></div>
        </div>
        <div className="lable">
          Name
        </div>
        <div className="user-detail">
          <input type="text" value={session?.user.username} />
        </div>
        <div className="lable">
          Phone Number
        </div>
        <div className="user-detail">
         <input type="text" value={session?.user.phone} />
        </div>
        <div className="lable">
          Email
        </div>
        <div className="user-detail">
          <input type="text" value={session?.user.email} />
        </div>
        {/* <div className="lable">
          Address
        </div>
        <div className="user-detail">
          <input type="text" value="11 keira street Wollongong NSW2500" />
        </div> */}
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
      
      
    </div>
  )
}

export default DeliveryProfile