'use client'

import { useSearchParams, useRouter } from "next/navigation"

const SearchRestaurants = () => {
    //access the query parameters in the URL
    const searchParams = useSearchParams()
    //returns the current URL path without the query parameters     
    
    const router = useRouter()

    const handleSearch = (searchTerm) => {
        const params = new URLSearchParams(searchParams)
        //add query parameter
        if (searchTerm) {
            params.set("query", searchTerm)
        } else {
            params.delete("query")
        }
        console.log(params)
        router.push(`/Search?${params.toString()}`)
    }

    return (
        <>
            
            <input type="text" name="search" placeholder="Find a restuarant" defaultValue={searchParams.get('query')?.toString()}
            onChange={(e)=> {
                handleSearch(e.target.value)
            }}/>
        </>

    )
}

export default SearchRestaurants;