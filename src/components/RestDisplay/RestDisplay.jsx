'use client';
import React, { useEffect, useState } from 'react';
import "./RestDisplay.css";
import RestCard from '../RestCard/RestCard';
import DropdownButton from '../DropdownButton/DropdownButton';

const RestDisplay = ({category}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [timeFilter, setTimeFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(()=> {
        const fetchRestaurants = async () => {

            const response = await fetch(`/api/restaurants`)
            const data = await response.json()
            console.log(data)

            setRestaurants(data) 
        }
        fetchRestaurants();
    }, [])

  const clearFilters = () => {
    setTimeFilter("All");
    setRatingFilter("All");
    setPriceFilter("All");
  };

  const filteredRestaurants = restaurants.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesTime = timeFilter === "All" || item.distance === timeFilter;
    const matchesRating = ratingFilter === "All" || item.rating >= parseFloat(ratingFilter);
    const matchesPrice = priceFilter === "All" || item.priceRange === priceFilter;
    
    return matchesCategory && matchesTime && matchesRating && matchesPrice;
  });

  const ratingOptions = [
    { label: "> 1", value: "1" },
    { label: "> 2", value: "2" },
    { label: "> 3", value: "3" },
    { label: "> 4", value: "4" },
    { label: "= 5", value: "5" }
  ];

   return (
    <div className='rest-display' id='rest-display' role='restaurant-list'>
      <div className="filters flex">
        <input className='postcode-input input' placeholder='Enter suburb or postcode'/>
        <DropdownButton 
          label="Time Filter"  
          options={[{label: "Any Time", value: "All"}, {label: "Under 30 mins", value: "Under 30 min"}]} 
          onChange={setTimeFilter} 
        />
        <DropdownButton 
          label="Ratings" 
          options={ratingOptions} 
          onChange={setRatingFilter} 
        />
        <DropdownButton 
          label="Price Range" 
          options={[{label: "Any Price", value: "All"}, {label: "$", value: "$"}, {label: "$$", value: "$$"}, {label: "$$$", value: "$$$"}]} 
          onChange={setPriceFilter} 
        />
        <div onClick={clearFilters} className="clear-filters">Clear Filters</div>
      </div>
      <h2>{category}</h2>
      <div className="rest-display-list">
        {filteredRestaurants.map((item, index) => {
          return <RestCard 
              key={index}
              id={item._id}
              name={item.name}
              rating={item.ratings.averageRating}
            />
        })}
      </div>
    </div>
  )
}

export default RestDisplay