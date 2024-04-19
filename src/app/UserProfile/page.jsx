import React from 'react'
import "./Profile.css"
import { FaEdit } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import Link from 'next/link'
import Image from 'next/image'


const Profile = () => {
  return (
    <div className='profile flex'>
      <Link href={"/"}><div className="back">&lt; Back to Home Page</div></Link>
      <h2>Profile</h2>
      <div className="first flex">
        <div className="image-icon flex">
          <Image src="/assets/images/food_18.png" width="10" height="10" alt="" className="user-image" />
          <div className="icon"><FaEdit /></div>
        </div>
        <div className="lable">
          Name
        </div>
        <div className="user-detail">
          <input type="text" value="Kathy Lau" />
        </div>
        <div className="lable">
          Phone Number
        </div>
        <div className="user-detail">
         <input type="text" value="+6452631253" />
        </div>
        <div className="lable">
          Email
        </div>
        <div className="user-detail">
           <input type="text" value="xxxx@gmail.com" />
        </div>
        <button className="btn">Save</button>
      </div>
      
      <div className="second flex">
        <div className="text flex">
          <div>Password</div>
          <div>................</div>
          <div>Last changed December 23, 2023</div>
        </div>
        <div className="icon"><FaArrowRight color="#7B7474" size="30"/></div>
      </div>
        

      <div className="third flex">
        <div className="text flex">
          <div>Membership</div>
          <div className='details'>
            <div>Start from</div>
            <div>17 December 2023</div>
            <div>Plan</div>
            <div>Monthly</div>
            <div>Next Bill date</div>
            <div>17 March, 2024</div>
          </div>
        </div>
        <div className="icon"><FaArrowRight color="#7B7474" size="30"/></div>
      </div>
    </div>
  )
}

export default Profile