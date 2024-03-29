import React, { useState } from 'react';
import "./Home.css";
import Header from '../../Components/Header/Header';
import RestDisplay from '../../Components/RestDisplay/RestDisplay';

export const HomePage = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header category={category} setCategory={setCategory}/>
      <RestDisplay category = {category} />
    </div>
  )
}
