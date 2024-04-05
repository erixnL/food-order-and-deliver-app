import '../styles/globals.css';
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// import Navbar from "./Components/Navbar/Navbar"
// import Footer from "./Components/Footer/Footer"
import Registration from "./Registration/Registration"
import { Route, Routes } from 'react-router-dom';
import Cart from './Cart/Cart';
import FoodDisplay from '../components/FoodDisplay/FoodDisplay';
import RestDisplay from '../components/RestDisplay/RestDisplay';
import Login from './Login/Login';
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
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/login' element={<Login/>} />
                      <Route path='/registration' element={<Registration />} />
                      <Route path='/restaurant' element={<RestDisplay />} />
                      <Route path='/cart' element={<Cart/>} />
                      <Route path='/menu' element={<FoodDisplay />} />
                    </Routes>
                </main>
                <Footer />
            </div>
            
        </body>
    </html>
  )
}

export default RootLayout
