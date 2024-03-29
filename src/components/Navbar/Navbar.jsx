'use client';
import React,{useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";



const Navbar = () => {
  const [Login, isLogin] = React.useState(false);
  
  return (
    <header>
      <nav className="navbarContainer flex">
        <div className="logo">
          UOW Eats
        </div>
        <div className='searchBar flex'>
          <div className="icon"><CiSearch size={20} /></div>
          <div>
            <input type="text" placeholder='Find a restaurant or dishes' />
          </div>
          <button className="btn">Go</button>
        </div>
        <div className='iconContainer flex'>
          <div className="cart flex">
            <div className="icon"><FiShoppingBag size={28}/></div>
            <div className="dot"></div>
          </div>
          {Login 
            ? 
              <div className="user flex">
                <div className="text">Kathy</div>
                <div className="icon"><FaRegUserCircle size={28}/></div>
              </div>
            : 
              <div className="action flex">
                <div className="login"><a href="">Login</a></div>
                <div className="signup"><a href="">Sign Up</a></div>
              </div>
          }
        </div>
        
      </nav> 
    </header>
  )
}

export default Navbar