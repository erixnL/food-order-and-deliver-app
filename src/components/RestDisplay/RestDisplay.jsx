'use client';
import React, { useEffect, useState } from 'react';
import "./RestDisplay.css";
import RestCard from '../RestCard/RestCard';
import DropdownButton from '../DropdownButton/DropdownButton';

const RestDisplay = ({category}) => {
  const [restaurants, setRestaurants] = useState([]);
  const [distanceFilter, setDistanceFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  // const [priceFilter, setPriceFilter] = useState("All");

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
    setDistanceFilter("All");
    setRatingFilter("All");
    // setPriceFilter("All");
  };

  const filteredRestaurants = restaurants.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const matchesTime = distanceFilter === "All" || 
                        (distanceFilter === "30mins" && (item.postcode === '2500' || item.postcode === '2522')) ||
                        (distanceFilter === "30miles" && (item.postcode === '2500' || item.postcode === '2522' || item.postcode === '2518'));
    const matchesRating = ratingFilter === "All" || item.ratings.averageRating >= parseFloat(ratingFilter);
    // const matchesPrice = priceFilter === "All" || item.priceRange === priceFilter;
    
    return matchesCategory && matchesTime && matchesRating;
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
        <input className='postcode-input input' placeholder='2500'/>
        <DropdownButton 
          label="Distance"  
          options={[{label: "Any", value: "All"}, {label: "< 30 mins", value: "30mins"}, {label: "< 30 miles", value: "30miles"}]} 
          onChange={setDistanceFilter} 
        />
        <DropdownButton 
          label="Ratings" 
          options={ratingOptions} 
          onChange={setRatingFilter} 
        />
        {/* <DropdownButton 
          label="Price Range" 
          options={[{label: "Any Price", value: "All"}, {label: "$", value: "$"}, {label: "$$", value: "$$"}, {label: "$$$", value: "$$$"}]} 
          onChange={setPriceFilter} 
        /> */}
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