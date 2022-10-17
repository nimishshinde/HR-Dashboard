import React from "react";
import Navbar from "../BusinessComponent/Navbar";
import "./Home.css";
import Sidebar from "../BusinessComponent/Sidebar";
import { Outlet } from "react-router-dom";
import Chat from "../BusinessComponent/Chat";

const Home = () => {
  return (
    <div>
      <div className="sidnav">
        <Sidebar />
        <div>
          <div style={{marginTop:'1rem', display:'flex', justifyContent:'center', width:"80vw"}} >
            <Navbar />
          </div>
          <Outlet />
        </div>
        {/* <div style={{display: 'flex', justifyContent: 'start'}} className='chat'><Chat /></div> */}
        
      </div>
    </div>
  );
};

export default Home;
