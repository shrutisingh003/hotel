import './App.css'
import First, { First1, First2, StateComponent } from './Class 1/First'
import Second, { FormHandlingManual, FormHandlingPackage, UseEffect } from './Class 2/Second';
import Routing, { ProductListing } from './Class 3/Third';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HotelState from './context/HotelState';
import Navbar from './components/Navbar';
import Hotel from './components/Hotel';
import Filtered from './components/Filtered';

function App() {
  return (
    <HotelState>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/hotel" element={<Hotel />} />
      <Route path="/filtered" element={<Filtered />} />
      <Route path="/" element={<ProductListing />} />
    </Routes>
    </BrowserRouter>
    </HotelState>
  )
}

export default App;