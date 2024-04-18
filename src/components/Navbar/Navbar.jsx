'use client';
import React,{useContext, useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import { AppContext } from '../../Context/AppContext';

const Navbar = () => {

  const {getCartTotal, Login, isLogin, setShowProfileMenu} = useContext(AppContext);

  return (
    <header>
      <nav className="navbarContainer flex">
        <Link to="/">
          <div className="logo">
            UOW Eats
          </div>
        </Link>
        <div className='searchBar flex'>
          <div className="icon"><CiSearch size={20} /></div>
          <div>
            <input type="text" placeholder='Find a restaurant or dishes' />
          </div>
          <button className="btn">Go</button>
        </div>
        <div className='iconContainer flex'>
          <div className="cart-icon flex">
            <Link to="./cart"><div className="icon"><FiShoppingBag size={28}/></div></Link>
            <div className={getCartTotal() ? "dot" :""}></div>
          </div>
          {Login 
            ? 
              <div className="user flex">
                <div className="text">Kathy</div>
                <div className="icon" onClick={()=>setShowProfileMenu(prev => !prev)}><FaRegUserCircle size={28}/></div>
              </div>
            : 
              <div className="action flex">
                <Link to="./login">
                  <div className="login">Login</div>
                </Link>
                <Link to="./registration">
                  <div className="signup">Sign Up</div>
                </Link>
              </div>
          }
        </div>
        
      </nav> 
    </header>
  )
}

export default Navbar