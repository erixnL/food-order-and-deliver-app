'use client';
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/home');
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Log the fetched data to the console
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  return (
    <>
    {/* This is the home page */}
    </>
  );
}
