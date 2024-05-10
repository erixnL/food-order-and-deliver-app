'use client';
import React,{useContext, useEffect, useState} from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, signOut, useSession} from "next-auth/react";
import SearchRestaurants from '../Search/SearchBar';
import { AppContext } from '@/Context/AppContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';


const Navbar = () => {
  
  const { data: session, status } = useSession(); 

  console.log("Navbar session:",session);

  const {cartItems, setCartItems, getCartTotal, showProfileMenu, setShowProfileMenu} = useContext(AppContext);

  const showCartIcon = !session || session?.user?.userRole === "customer";

  const [navbarColor, setNavbarColor] = useState("");

  useEffect(() => {
    const color = !session || session?.user?.userRole === "customer" ? "red" 
      : session?.user?.userRole === "delivery_person" ? "blue" 
      : "green" ;

    setNavbarColor(color);
    // console.log("Color",navbarColor);  
  },[session, status]); 

  useEffect(() => {
    // console.log("Session status:", status);
    // console.log("Session data:", session);
    if (status === 'authenticated' && session?.user?.cart?.items) {
      // Assuming session.cart.items is an array and needs to be transformed to an object
      const newCartItems = session.user.cart.items.reduce((acc, item) => ({
        ...acc,
        [item.itemId]: { ...item }
      }), {});
      setCartItems(newCartItems);
      console.log('CartItems from navbar page:',cartItems);
    }
  }, [session, status]);


  return (
    <header>
      {showProfileMenu? <ProfileMenu /> : <></>}
      <nav className={`navbarContainer ${navbarColor} flex`}>
        <Link href={'/'}>
          <div className="logo" role='Logo'>
            UOW Eats
          </div>
        </Link>

        {session && session?.user?.userRole === "restaurant" 
          ?
          <div className="nav-menu-list flex">
            <Link href="/RestaurantProfile" className="menu-item">Restaurant Profile</Link>
            <Link href="/RestaurantOrderList" className="menu-item">Order</Link>
            <Link href="/MenuList" className="menu-item">Menu</Link>
            <Link href="/MenuList" className="menu-item">Report</Link>
          </div> 
          
          : 
          <div className='searchBar flex'>
            <div className="icon"><CiSearch size={20} /></div>
            <div>
              <SearchRestaurants />
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