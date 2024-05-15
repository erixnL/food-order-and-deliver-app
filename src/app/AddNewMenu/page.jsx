'use client'
import React, { useEffect, useState } from 'react'
import "./AddNewMenu.css"
import { useSession } from 'next-auth/react';
import { FaEdit } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

const AddNewMenu = () => {
  const { data: session, status } = useSession();
  console.log("Add New Menu session data", session);

  const [menuItems, setMenuItems] = useState([]);

  const [newItem, setNewItem] = useState({name: '', price: ''});
  console.log("newItem", newItem);

  console.log("AddNewItem menuItems",menuItems);

  useEffect(() => {
    // Fetch the current menu items on component mount
    const fetchMenuItems = async () => {
      const response = await fetch(`/api/restaurant/${session?.user.restaurant}`);
      if (response.ok) {
        const data = await response.json();
        setMenuItems(data.menu);
      }
    };
    fetchMenuItems();
  }, [session]);

  const handleInputChange = (e, field) => {
    setNewItem({ ...newItem, [field]: e.target.value });
  };

  const handleSave = async () => {
    const price = parseFloat(newItem.price);
    if (isNaN(price)) {
      alert('Please enter a valid price');
      return;
    }
    const newItemWithFormattedPrice = {...newItem, price: price.toFixed(2) };

    const updatedMenu = [...menuItems, newItemWithFormattedPrice]; 
    
    console.log("updatedMenu", updatedMenu);

    try {
      const response = await fetch ('api/updateMenu', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId: session?.user.restaurant, 
          newMenu: updatedMenu
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to add the menu item');
      }
     
      alert('Menu item added successfully!',"updatedMenu: ", updatedMenu );
      window.location.href = '/MenuList';
      setNewItem({name: '', price: ''});

    } catch (error) {
      console.error('Failed to add menu item:', error);
      alert('Failed to add menu item');
    }
  };


  return (
    <div className='add-new-menu flex'>
      <Link href={"/MenuList"}><div className="back">&lt; Back to menu list</div></Link>
      {status === 'authenticated' && session ? (
      <>
        <h2>Add New Item</h2>
        <div className="first flex">
          <div className="image-icon flex">
            <Image src="/assets/images/food_18.png" width="10" height="10" alt="" className="user-image" />
            <div className="icon"><FaEdit /></div>
          </div>
          <div className="lable">
            Name
          </div>
          <div className="menu-detail">
            <input type="text" required value={newItem.name} onChange={(e) => handleInputChange(e, 'name')}/>
          </div>
          <div className="lable">
            Price
          </div>
          <div className="menu-detail">
            <input type="text" required value={newItem.price} onChange={(e) => handleInputChange(e, 'price')}/>
          </div>
          <button className="add-menu-btn btn" onClick={handleSave}>Save</button>
        </div>
        </>) 
        : (
          <div>
          </div>
        )}
    </div>
  )
}

export default AddNewMenu