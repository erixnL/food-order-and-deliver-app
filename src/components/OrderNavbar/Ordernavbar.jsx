import React from 'react'
import "./OrderNavbar.css"

const OrderNavbar = ({ onSelectFilter }) => {

  const handleSelectFilter = (filter) => {
    onSelectFilter(statusMapping[filter]);  // Pass filter back to the parent component
  };

  const statusMapping = {
    'New Order': ['new'],
    'Preparing': ['accepted', 'preparing'],
    'Ready for pick up': ['ready_for_pickup'],
    'Delivery': ['on_the_way'],
    'Cancel / Refund': ['rejected', 'refund'],
    'Delivered': ['delivered'],
    'All': ['all']  // 'all' means no filtering
  };

  return (
    <div className='order-navbar flex'>
      {Object.keys(statusMapping).map(filter => (
        <div 
          key={filter} 
          className="order-navbar-item" 
          onClick={() => handleSelectFilter(filter)}>
          {filter}
        </div>
      ))}
    </div>
  )
}

export default OrderNavbar