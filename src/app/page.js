'use client'
import '../styles/globals.css';
import Header from "@/components/Header/Header";
import RestDisplay from "@/components/RestDisplay/RestDisplay";
import { useState } from "react";


const Home = () => {
  const [category, setCategory] = useState("All");
  
  return ( 
    <>
        
          <Header category={category} setCategory={setCategory}/>
          <RestDisplay category = {category} />
        
    </>
  )
}

export default Home




