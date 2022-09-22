import React, { useEffect, useState } from "react";
import EmployeeDashboard from "./Employee/EmployeeDashboard";
import DashboardTableOne from "../SmallComponents/DashboardTableOne";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import "./Dashboard.css";

function Dashboard() {
  const userObj = useSelector(state => state);
  const dispatch = useDispatch();
  console.log('comming from use selector', userObj)

  const [clickStyle, setClickStyle] = useState(0);

  const [small, setSmall] = useState(false);
  const [employeeType, setEmp] = useState();

  useEffect(()=>{
    setEmp(userObj.employeeType);
    console.log(userObj)
  }, [])
  return (
    <>
      {userObj.employeeType == 1 ? (
        <>
          <div className="dashItems">
            <div
              className={` ${clickStyle === 1 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(1);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Engineering</motion.div>
            </div>
            <div
              className={` ${clickStyle === 2 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              }`}
              onClick={() => {
                setClickStyle(2);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Operations</motion.div>
            </div>
            <div
              className={` ${clickStyle === 3 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(3);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Accounts</motion.div>
            </div>
            <div
              className={` ${clickStyle === 4 ? "activeSection" : ""} ${
                small ? " sections" : " section"
              } `}
              onClick={() => {
                setClickStyle(4);
                setSmall(true);
              }}
            >
              <motion.div whileHover={{ scale: 1.2 }}>Supply Chain</motion.div>
            </div>
            {clickStyle != 0 && <DashboardTableOne clickedBtn={clickStyle} />}
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
