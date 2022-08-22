import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import "./Home.css";
import Leave from '../component/Leave';
import Sidebar from '../component/Sidebar';
import {
  Routes, Route, Outlet
} from 'react-router-dom';
import Section from '../component/Section';
import Dashboard from "../component/Dashboard";


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