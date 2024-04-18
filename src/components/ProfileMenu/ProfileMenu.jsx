import React, { useContext } from 'react'
import "./ProfileMenu.css"
import photo from "../../Assets/food_18.png"
import { AppContext } from '../../Context/AppContext'
import { Link } from 'react-router-dom'

const ProfileMenu = () => {

  const {isLogin, setShowProfileMenu} = useContext(AppContext);

    return (
    <div className="profile-menu flex">
      <div className="userInfo flex">
        <img src={photo} alt="" className="user-image" />
        <div className="text flex">
          <div className="name">Kathy</div>
          <div className="membership">Membership</div>
        </div>
      </div>
      <div className="user-menu flex">
        <Link to="/profile">
          <div onClick={()=>setShowProfileMenu(false)}>Profile</div>
        </Link>
        <Link to="/orderhistory">
          <div onClick={()=>setShowProfileMenu(false)}>Order History</div>
        </Link>
      </div>
      <div onClick={function(event){isLogin(prev => false);setShowProfileMenu(false) }} className="sign-out">Sign out</div>
    </div>
  )
}

export default ProfileMenu