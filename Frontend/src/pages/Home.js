import React from "react";
import Navbar from "../BusinessComponent/Navbar";
import "./Home.css";
import Sidebar from "../BusinessComponent/Sidebar";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="sidnav">
        <Sidebar />
        <div>
          <div style={{marginLeft : '2vw', marginTop:'1rem',width:'78vw', display:'flex', justifyContent:'center'}} >
            <Navbar />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
