'use client'
import React, {useState} from 'react';
import "./Registration.css";
import { MdOutlinePerson } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const Registration = () => {

  const [action, setAction] = useState("Login");
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData, 
      [name]:value
    })
  }

  const validateForm = () => {
    const validationErrors = {};

    if(!formData.email.trim()){
      validationErrors.email = "email is required"
    } else if (!/\S+@uowmail\.edu\.au/.test(formData.email)){
      validationErrors.email = "This email is not a valid UOW email"
    }

    if(!formData.password.trim()){
      validationErrors.password = "password  is required"
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "The passwords do not match!";
    }

    return errors;
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    
    if(Object.keys(errors).length > 0) {
      setErrors(errors);
    } else{
      setErrors({});
      alert("Form Submitted successfully");
    }
  }


  return (
    <div className="registrationContainer flex">
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
            
            <div className="input flex">
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder='Confirm Password'
                onChange={handleChange}
              />
              <div className="icon"><RiLockPasswordLine size={20} /></div>
            </div>

            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}

            <div className="submit flex">
              <input className="btn" type="submit" value="Register" />
            </div>            
          </form>
        </div>
        <div className="forgot-password">
            <span>
              <a href="#">Forgot Password? </a>
            </span>
            <span> | </span>
            <span> 
              <a href="/login">Sign In</a>
            </span>
          </div>
    </div>
  )
}

export default Registration