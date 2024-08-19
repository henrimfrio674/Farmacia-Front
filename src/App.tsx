import React from 'react';
import './App.css';
import Home from './pages/home/home';
import Navbar from './components/navBar/NavBar';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
    <Navbar/>
    <Home/>
    <Footer/>
    </>
);
}
export default App;