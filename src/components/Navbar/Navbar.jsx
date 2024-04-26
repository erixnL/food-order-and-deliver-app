'use client';
import React,{useContext, useEffect, useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, signOut, useSession} from "next-auth/react";
import SearchRestaurants from '../Search/SearchBar';

import { AppContext } from '../../Context/AppContext';
import DropdownButton from '../DropdownButton/DropdownButton';

const Navbar = () => {
  
  const { data: session, status } = useSession(); 

  return (
    <header>
      <nav className="navbarContainer flex">
        <Link href={'/'}>
          <div className="logo" role='Logo'>
            UOW Eats
          </div>
        </Link>
        <div className='searchBar flex'>
          <div className="icon"><CiSearch size={20} /></div>
          <div>
            <SearchRestaurants />
          </div>
          <button className="btn">Go</button>
        </div>
        <div className='iconContainer flex'>
          <div className="cart-icon flex">
            <Link href={'/Cart'}><div className="icon"><FiShoppingBag size={28}/></div></Link>
            <div className="dot"></div>
          </div>
          {status === 'authenticated' && session ? (
                        <div className="user flex">
                            <div className="text">{session.user.username}</div>
                            <div className="icon">
                                <FaRegUserCircle size={28} />
                            </div>
                            <button className="logout-btn" onClick={() => signOut()}>Logout</button>
                        </div>
                    ) : (
                        <div className="action flex">
                            <button className="login" onClick={() => signIn()}>Login</button>
                            <Link href={'/SignUp'}>
                                <button className="signup">Sign Up</button>
                            </Link>
                        </div>
                    )}
        </div>
        
      </nav> 
    </header>
  )
}

export default Navbar