'use client';
import React, { useState } from 'react';
import "./Login.css";
import { MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {signIn, signOut, useSession} from "next-auth/react";

const Login = () => {

  const [action, setAction] = React.useState("Login");
  
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = React.useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, [name]:value
    })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if(!formData.email.trim()){
      validationErrors.email = "email is required"
    } 

    if(!formData.password.trim()){
      validationErrors.password = "password  is required"
    }
    
    setErrors(validationErrors)

    
  }

  const handleClearForm = (actionType) => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({});
    setAction(actionType);

  }


  return (
    <div className="loginContainer flex">
        <div className="text">What is your phone number or email?</div>
        <div className="formContainer flex">
          <form onSubmit={handleSubmit}>
            <div className="input flex">
              <input 
                type="email" 
                name="email" 
                placeholder='Enter your email' 
                onChange={handleChange}
              />
              <div className="icon"><MdOutlinePerson size={20} /></div>  
            </div>
            {errors.email && <span className="error">{errors.email}</span>}
            <div className="input flex">
              <input 
                type="password" 
                name="password" 
                placeholder='Password'
                onChange={handleChange}
              />
              <div className="icon"><RiLockPasswordLine size={20} /></div>
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
            <div className="submit flex">
              <input className="btn" type="submit" value="Login" onClick={()=> signIn()}/>
            </div>            
          </form>
        </div>
        <div className="forgot-password">
            <span>
              <a href="#">Forgot Password? </a>
            </span>
            <span> | </span>
            <span> 
              <a href="#">Sign up</a>
            </span>
          </div>
    </div>
  )
}

export default Login