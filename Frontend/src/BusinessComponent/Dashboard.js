import React, { useState } from "react";
// import { useDataLayerValue } from "../DataLayer/DataLayer";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import "./Dashboard.css";
import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import DashboardTableOne from "../SmallComponents/DashboardTableOne";


function Dashboard() {
  // console.log();
  const [clickStyle, setClickStyle] = useState(0);
  
  const [small, setSmall] = useState(false)
  const [employeeType, setEmp] = useState(1);
  return (
    <>
      {employeeType == 1 ? (
        <>
        <div className='dashItems'>
          <div className={` ${clickStyle === 1 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {setClickStyle(1); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Engineering</motion.div></div>
          <div className={` ${clickStyle === 2 ? "activeSection" : ""} ${small ? " sections" : " section"}`} onClick={() => {setClickStyle(2);setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Operations</motion.div></div>
          <div className={` ${clickStyle === 3 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {setClickStyle(3); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Accounts</motion.div></div>
          <div className={` ${clickStyle === 4 ? "activeSection" : ""} ${small ? " sections" : " section"} `} onClick={() => {setClickStyle(4); setSmall(true)}} ><motion.div whileHover={{ scale: 1.2}}>Supply Chain</motion.div></div>
          {
            clickStyle != 0 && <DashboardTableOne clickedBtn = { clickStyle }/>
          }
          
        </div>
      </> 
      ) : (
        <div>
          <EmployeeDashboard />
        </div>
      )}
    </>
  );
}

export default Dashboard;
