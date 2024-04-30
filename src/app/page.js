'use client'
import '../styles/globals.css';
import Category from "@/components/Category/Category";
import RestDisplay from "@/components/RestDisplay/RestDisplay";
import { useState } from "react";
import AppContextProvider, { AppContext } from '@/Context/AppContext';
import FoodDisplay from '@/components/FoodDisplay/FoodDisplay';


const Home = () => {
  const [category, setCategory] = useState("All");

  
  return ( 
    <>
        <AppContextProvider>
          <Category role="cateogries" category={category} setCategory={setCategory}/>
          <RestDisplay category = {category} />
        </AppContextProvider>
    </>
  )
}

export default Home




