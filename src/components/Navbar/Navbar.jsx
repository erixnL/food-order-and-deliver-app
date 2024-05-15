'use client';
import React,{useContext, useEffect, useState} from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { FiShoppingBag } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import Link from 'next/link';
import {signIn, useSession} from "next-auth/react";
import SearchBar from '../Search/SearchBar';
import { AppContext } from '@/Context/AppContext';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { useSearchParams, useRouter } from "next/navigation"
import { IoMdNotifications } from "react-icons/io";
import Notification from '../Notification/Notification';



const Navbar = () => {
  
  const { data: session, status } = useSession(); 
  console.log("Navbar session:",session);
  const searchParams = useSearchParams();
  const router = useRouter();

  const {cartItems, setCartItems, getCartTotal, showProfileMenu, setShowProfileMenu, showNotification, setShowNotification} = useContext(AppContext);

  const showCartIcon = !session || session?.user?.userRole === "customer";
  const showNotificationIcon = session;

  const [navbarColor, setNavbarColor] = useState("");
  const [orderList, setOrderList] = useState([]);
  console.log("Navbar", orderList);
  console.log("Navbar", showNotification);
  

  const handleSearch = (searchTerm) => {
      const params = new URLSearchParams(searchParams)
      if (searchTerm) {
          params.set("query", searchTerm)
      } else {
          params.delete("query")
      }
      router.push(`/Search?${params.toString(orderList)}`)
  }

  useEffect(() => {
    const color = !session || session?.user?.userRole === "customer" ? "red" 
      : session?.user?.userRole === "delivery_person" ? "blue" 
      : "green" ;

    setNavbarColor(color);
    // console.log("Color",navbarColor);  
  },[session, status]); 

  
  useEffect(() => {
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

  useEffect(()=>{
    const fetchOrders = async() => {
      const response = await fetch(`/api/restaurantOrder`);
      if(response.ok){
        const data = await response.json();

        if (session?.user?.userRole === "restaurant" && session?.user?.restaurant) {
          const filteredOrders = data.filter(order => 
            order.restaurant === session.user.restaurant && order.orderStatus === "new"
          );

          setOrderList(filteredOrders);
        } else if (session?.user?.userRole === "customer"){
          const filteredOrders = data.filter(order => 
            order.user === session.user.id && order.orderStatus === "accepted");

          setOrderList(filteredOrders);

        } else{
          const filteredOrders = data.filter(order => 
            order.orderStatus === "ready_for_pickup");
          setOrderList(data);
        }

      }else {
        console.error("Failed to fetch orders");
        setOrderList([]);  // Ensure state is clear if fetch fails
      }
    };
    fetchOrders();
  },[session]); 


  return (
    <header>
      {showProfileMenu ? <ProfileMenu /> : <></>}
      {showNotification ? <Notification /> : <></>}
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
            <Link href="/RestaurantReport" className="menu-item">Report</Link>
          </div> 

          : session && session?.user?.userRole === "delivery_person" 
          ?
          <div className="nav-menu-list flex">
            <Link href="/DeliveryProfile" className="menu-item">Profile</Link>
            <Link href="/DeliveryOrderList" className="menu-item">Order</Link>
          </div> 
          
          : 
          <div className='searchBar flex'>
            <div className="icon"><CiSearch size={20} /></div>
            <div>
              <SearchBar handleSearch={handleSearch}/>
            </div>
            <button className="btn" onClick={() => handleSearch(document.querySelector('[name="search"]').value)}>Go</button>
          </div>
        }

        <div className='iconContainer flex'>
          {showNotificationIcon && 
            <div className="notification-icon flex">
              <div 
                className="icon" 
                onClick={()=>setShowNotification(prev => !prev)}>
                  <IoMdNotifications size={28}/>
              </div>
              <div className={ orderList.length > 0? "dot" :""}></div>
            </div>
          }
          {showCartIcon && 
            <div className="cart-icon flex">
              <Link href={"/Cart"}><div className="icon">
                <FiShoppingBag size={28}/></div>
              </Link>
              <div className={getCartTotal() ? "dot" :""}></div>
            </div>
          }
          {status === 'authenticated' && session ? (
            <div className="user flex">
              <div className="text">{session.user.username}</div>
              <div 
                className="icon" 
                onClick={()=>setShowProfileMenu(prev => !prev)}
              >
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