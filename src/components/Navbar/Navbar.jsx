'use client';
import React,{useContext, useState } from 'react'
import React,{useEffect, useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, signOut, useSession} from "next-auth/react";

import { AppContext } from '../../Context/AppContext';

const Navbar = () => {
  
  const { data: session, status } = useSession();
    useEffect(() => {
      console.log(session);
  }, [session]);
  

  const {getCartTotal, Login, isLogin, setShowProfileMenu, userRole, setUserRole} = useContext(AppContext);

  return (
    <header>
      <nav className="navbarContainer flex">
        <Link href={'/'}>
          <div className="logo" role='Logo'>
            UOW Eats
          </div>
        </Link>
        
        {userRole === "customer" 
            ? 
            <div className='searchBar flex'>
              <div className="icon"><CiSearch size={20} /></div>
              <div>
                <input type="text" placeholder='Find a restaurant or dishes' />
              </div>
              <button className="btn">Go</button>
            </div>
            : 
            <div className="nav-menu-list flex">
              <div className="menu-item">Restaurant Profile</div>
              <div className="menu-item">Order</div>
              <div className="menu-item">Menu</div>
              <div className="menu-item">Report</div>
            </div>
          }
        
        <DropdownButton 
          label="Roles" 
          options={[
            {label: "Customer", value: "customer"}, 
            {label: "Restaurant Owner", value: "restaurant_owner"},
            {label: "Deliverer", value: "deliverer"}
          ]} 
          onChange={setUserRole}
        />
        <div className='iconContainer flex'>
          <div className="cart-icon flex">
            <Link to="./cart"><div className="icon"><FiShoppingBag size={28}/></div></Link>
            <div className={getCartTotal() ? "dot" :""}></div>
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