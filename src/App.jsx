
// import './App.css'
import React, { useState, useEffect } from 'react';
import About from './components/About/About'
import Blog from './components/Blog/Blog'
import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Services from './components/Services/Services.jsx'
import Tools from './components/Tools/Tools'
import SoilScanner from './components/SoilScanner/SoilScanner';
import Weather from './components/Weather/Weather';
import MapSection from './components/MapSection/MapSection';
import CartDrawer from './components/CartDrawer/CartDrawer';
import Badges from './components/Badges/Badges';
import Dashboard from './components/Dashboard/Dashboard';
import CropChatbot from './components/CropChatbot/CropChatbot';



function App() {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <SoilScanner />
      <Weather />
      <MapSection />
      <Dashboard />
      {/* <CartDrawer /> */}
      <Badges />
      <Products />
      <Blog />
      <Tools />
      <Footer />
      <CropChatbot />
      {/* Add other components like Blog, Contact, etc. as needed */}
    </div>
  )
}

export default App;
