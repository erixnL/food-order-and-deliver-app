import React, { useState } from 'react'
import "./OrderNavbar.css"

const OrderNavbar = ({ onSelectFilter, filtersToShow  }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const statusMapping = {
    'New Order': ['new'],
    'Preparing': ['accepted', 'preparing'],
    'Ready for pick up': ['ready_for_pickup'],
    'Delivery': ['on_the_way'],
    'Cancel / Refund': ['rejected', 'refund'],
    'Delivered': ['delivered'],
    'All': ['all']  // 'all' means no filtering
  };

  const visibleFilters = filtersToShow ? Object.keys(statusMapping).filter(key => filtersToShow.includes(key)) : Object.keys(statusMapping);

  const handleSelectFilter = (filter) => {
    setActiveFilter(filter);
    onSelectFilter(statusMapping[filter]);  // Pass filter back to the parent component
  };


  return (
    <div className='order-navbar flex'>
      {visibleFilters.map(filter => (
        <div 
          key={filter} 
          className={`order-navbar-item ${activeFilter === filter ? 'active' : ''}` }
          onClick={() => handleSelectFilter(filter)}>
          {filter}
        </div>
      ))}
    </div>
  )
}

export default OrderNavbar