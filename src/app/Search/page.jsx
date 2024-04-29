'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

//Render Search Results in this page

const Search =  () => {
  
    const [searchResult, setSearchResult] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    
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
    // const filteredRestaruants = 
  return (
        // can use Restcard (reference to restdisplay)
        <div>Search</div>

  )
}

export default Search