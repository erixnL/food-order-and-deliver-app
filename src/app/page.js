'use client'
import '../styles/globals.css';
import Header from "@/components/Header/Header";
import RestDisplay from "@/components/RestDisplay/RestDisplay";
import { useState } from "react";
import AppContextProvider from "../Context/AppContext";

const Home = () => {
  const [category, setCategory] = useState("All");
  
  return ( 
    <>
      <BrowserRouter>
        <AppContextProvider>
          <Header category={category} setCategory={setCategory}/>
          <RestDisplay category = {category} />
        </AppContextProvider>
      </BrowserRouter>
    </>
  )
}

export default Home




