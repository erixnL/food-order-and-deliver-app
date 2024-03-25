import './App.css';
import Navbar from "./Components/Navbar/Navbar"
import Footer from "./Components/Footer/Footer"
import Login from "./Pages/Login/Login"
import Registration from "./Pages/Registration/Registration"
import { Route, Routes } from 'react-router-dom';
import { Home } from './Pages/Home/Home';
import Cart from './Pages/Cart/Cart';
import PlaceOrder from './Pages/PlaceOrder/PlaceOrder';


function App() {
  return (
    <div className="App flex">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
