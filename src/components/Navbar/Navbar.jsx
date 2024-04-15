'use client';
import React,{useEffect, useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, signOut, useSession} from "next-auth/react";


const Navbar = () => {
  const [Login, isLogin] = useState(false);
  const { data: session, status } = useSession();
  
  return (
    <header>
      <nav className="navbarContainer flex">
        <Link href={'/'}>
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