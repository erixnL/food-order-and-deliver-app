'use client'
import Image from 'next/image'
import "./Search.css"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import RestCard from '@/components/RestCard/RestCard'

const Search =  () => {
  
    const [searchResult, setSearchResult] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query')?.toLowerCase() || '';
    
    console.log(query)
    useEffect(()=> {
        const fetchRestaurants = async () => {

            const response = await fetch(`/api/restaurants`)
            const data = await response.json()
            console.log(data)

            setSearchResult(data)
        }
        fetchRestaurants();
        
    }, [])
    // filter according to the query
    const filteredRestaurants = searchResult.filter(
        restaurant => {
            // Check if restaurant name matches the query
            const nameMatch = restaurant.name.toLowerCase().includes(query);
            const categoryMatch = restaurant.category && restaurant.category.toLowerCase().includes(query);

            // Check if any dish name matches the query
            const dishMatch = restaurant.menu && restaurant.menu.some(dish => dish.name?.toLowerCase().includes(query)
            );

            return nameMatch || categoryMatch || dishMatch;
        }
    )
  return (
        <div className='searchPage-container'>
            <h2>Search Result</h2>
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

export default Search