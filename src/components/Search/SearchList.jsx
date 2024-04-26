import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

//Render Search Results in this page

const SearchList =  ({ params }) => {
    const [searchResult, setSearchResult] = useState([]);
    useEffect(()=> {
        const fetchRestaurants = async () => {
            const response = await fetch(`/api/restaurants`)
            const data = await response.json()
            console.log(data)

            setSearchResult(data)
        }
        fetchRestaurants();
        
    }, [])
    // filter according to the params.query
    // const filteredRestaruants = 
  return (
    <div>Search</div>
  )
}

export default SearchList