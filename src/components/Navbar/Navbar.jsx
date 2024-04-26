'use client';
import React,{useContext} from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, signOut, useSession} from "next-auth/react";
import { AppContext } from '@/Context/AppContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Navbar = () => {
  
  const { data: session, status } = useSession(); 

  console.log(session);

  const {getCartTotal, showProfileMenu, setShowProfileMenu} = useContext(AppContext);

  const showCartIcon = !session || session?.user?.userRole === "customer";

  return (
    <header>
      {showProfileMenu? <ProfileMenu /> : <></>}
      <nav className="navbarContainer flex">
        <Link href={'/'}>
          <div className="logo" role='Logo'>
            UOW Eats
          </div>
        </Link>

        {session && session?.user?.userRole === "restaurant" 
          ?
          <div className="nav-menu-list flex">
            <div className="menu-item">Restaurant Profile</div>
            <div className="menu-item">Order</div>
            <div className="menu-item">Menu</div>
            <div className="menu-item">Report</div>
          </div> 
          
          : 
          <div className='searchBar flex'>
            <div className="icon"><CiSearch size={20} /></div>
            <div>
              <input type="text" placeholder='Find a restaurant or dishes' />
            </div>
            <button className="btn">Go</button>
          </div>
        }

        <div className='iconContainer flex'>
          {showCartIcon && 
            <div className="cart-icon flex">
              <Link href={"/Cart"}><div className="icon"><FiShoppingBag size={28}/></div></Link>
              <div className={getCartTotal() ? "dot" :""}></div>
            </div>
          }
          {status === 'authenticated' && session ? (
                <div className="user flex">
                    <div className="text">{session.user.username}</div>
                    <div className="icon" onClick={()=>setShowProfileMenu(prev => !prev)}>
                        <FaRegUserCircle size={26} />
                    </div>
                </div>
            ) : (
                <div className="action flex">
                    <div className="login" onClick={() => signIn()}>Login</div>
                    <Link href={'/Registration'}>
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