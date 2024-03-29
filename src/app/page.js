'use client'
import '../styles/Home.css';
import './Home/Home.css';
import Header from "@/components/Header/Header";
import RestDisplay from "@/components/RestDisplay/RestDisplay";
import { useState } from "react";
import RestContextProvider from "@/Context/RestContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  
  return ( 
    <>
      <RestContextProvider>
        <Header category={category} setCategory={setCategory}/>
        <RestDisplay category = {category} />
      </RestContextProvider>
    </>
  )
}

export default Home




