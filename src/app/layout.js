
import '../styles/globals.css';
import Link from 'next/link';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import Navbar from "./Components/Navbar/Navbar"
// import Footer from "./Components/Footer/Footer"
import Registration from "./Registration/page"
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart/page';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay';
import RestDisplay from '../components/RestDisplay/RestDisplay';
import Login from './Login/page';
import Home from './page';



export const metadata = {
  title: "Order and Get the Food Delivered",
  description: "Order Good From Local Restaurant and Support Community Business"
}

const RootLayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="App flex">
                <Navbar />
                <main className="app">
                    {children}
                </main>
                <Footer />
            </div>
            
        </body>
    </html>
  )
}

export default RootLayout
