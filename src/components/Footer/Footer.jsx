'use client';
import React from 'react'
import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";



const Footer = () => {
  return (
    <div className="footerContainer flex">
      <div className="logo">
        UOW Eats
      </div>
      <div className="LinkContainer flex">
        <div className="list">
          <ul>
            <li>About us</li>
            <li>All Stores</li>
            <li>Catgories</li>
            <li>Prmotions</li>
          </ul>
        </div>
        <div className="terms flex">
          <div className="text">Terms of Service</div>
          <div className="text">Privacy</div>
          <div className="text">@2024 UniEats</div>
        </div>
      </div>
      <div className="iconContainer flex">
        <div className="first flex">
          <div className="icon"><FaFacebook /></div>
          <div className="icon"><FaInstagram /></div>
          <div className="icon"><FaTwitter /></div>
        </div>
        <div className="second flex">
          <div className="icon"></div>
          <div className="icon"></div>
        </div>
      </div>
    </div>
  )
}

export default Footer