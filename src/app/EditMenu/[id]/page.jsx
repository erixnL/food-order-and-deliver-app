'use client'
import React, { useEffect, useState } from 'react'
import "./EditMenu.css"
import { useSession } from 'next-auth/react';
import { FaEdit } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const EditMenu = () => {  
  const { data: session, status } = useSession();
  console.log("Edit Menu session data", session);

  const [menuItems, setMenuItems] = useState([]);
  const [editingItem, setEditingItem] = useState({});
  

  const pathname = usePathname();
  const itemId = pathname.split('/').pop();
  console.log("EditMenu itemId", itemId);

  const restaurantId = session?.user?.restaurant;

  console.log("EditMenu menuItems data", menuItems);
  console.log("EditMenu editingItem", editingItem);

  useEffect(()=> {
    const fetchRestaurantMenu  = async () => {
      
      if (restaurantId) {
        const response = await fetch(`/api/restaurant/${restaurantId}`); 
        if (response.ok) {
          const data = await response.json();
          setMenuItems(data.menu);

          // Find the item by itemId and set it for editing
          const itemToEdit = data.menu.find(item => item._id === itemId);
          console.log("itemToEdit",itemToEdit)
          if (itemToEdit) {
            setEditingItem(itemToEdit);
          }
        }
      }
    }
    fetchRestaurantMenu ();    
  }, [restaurantId, itemId])

  const handleInputChange = (e, field) => {
    setEditingItem({ ...editingItem, [field]: e.target.value });
  };

  const saveChanges = async () => {
    
    const updatedMenu = menuItems.map(
      item => item._id === editingItem._id 
      ? {...item, name: editingItem.name, price: parseFloat(editingItem.price)} 
      : item
    );

    if (restaurantId) {
      const response = await fetch(`/api/updateMenu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId, 
          newMenu: updatedMenu
        }),
      });
      if (response.ok) {
        alert('Item updated successfully!');
        window.location.href = '/MenuList';
        
      } else {
        alert('Failed to update item.');
      }
    }
    
  };

  const deleteItem = async () => {
    
    const updatedMenu = menuItems.filter(item => item._id !== editingItem._id);


    if (restaurantId) {
      const response = await fetch(`/api/updateMenu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurantId, 
          newMenu: updatedMenu
        }),
      });
      if (response.ok) {
        alert('Item deleted successfully!');
        window.location.href = '/MenuList';
        
      } else {
        alert('Failed to update item.');
      }
    }
    
  };



  return (
    <div className='edit-menu flex'>
      <Link href={"/MenuList"}><div className="back">&lt; Back to menu list</div></Link>
      {status === 'authenticated' && session ? (
      <>
        <h2>Edit Item</h2>
        <div className="first flex">
          <div className="image-icon flex">
            <Image src="/assets/images/food_18.png" width="10" height="10" alt="" className="user-image" />
            <div className="icon"><FaEdit /></div>
          </div>
          <div className="lable">
            Name
          </div>
          <div className="menu-detail">
            <input 
              type="text" 
              value={editingItem.name} 
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </div>
          <div className="lable">
            Price
          </div>
          <div className="menu-detail">
            <input type="text" 
              value={editingItem.price} 
              onChange={(e) => handleInputChange(e, 'price')} 
            />
          </div>
          <div className="edit-menu-action flex">
            <button className="edit-menu-btn save btn" onClick={saveChanges}>Save</button>
            <button className="edit-menu-btn delete btn" onClick={deleteItem}>Delete</button>
          </div>
          
        </div>
        </>) 
        : (
          <div>
          </div>
        )}
    </div>
  )
}

export default EditMenu