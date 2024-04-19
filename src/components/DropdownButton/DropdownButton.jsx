import React, { useState } from 'react'
import "./DropdownButton.css"
import { IoIosArrowDown } from "react-icons/io";

const DropdownButton = ({ label, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="dropdownButton">
      <button onClick={toggleDropdown} className="dropdown-button btn">{label} <IoIosArrowDown size={16} /></button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option, index) => (
            <li 
              key={index} 
              className="dropdown-item" 
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
            }}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default DropdownButton