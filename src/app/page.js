'use client'
import '../styles/globals.css';
import Category from "@/components/Category/Category";
import RestDisplay from "@/components/RestDisplay/RestDisplay";
import { useState } from "react";


const Home = () => {
  const [category, setCategory] = useState("All");
  
  return ( 
    <>
        
          <Category category={category} setCategory={setCategory}/>
          <RestDisplay category = {category} />
        
    </>
  )
}

export default Home




