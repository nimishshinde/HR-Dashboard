import React from 'react';
import Navbar from "../BusinessComponent/Navbar";
import "./Home.css";
import Sidebar from "../BusinessComponent/Sidebar";
import { Outlet } from 'react-router-dom';
const Home = () => {
  
  return (
    <div>
      <div className='sidnav'>
        <Sidebar />
        <div>
          <Navbar />
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Home;