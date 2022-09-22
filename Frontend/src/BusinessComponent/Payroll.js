import React, { useState } from "react";
import "./Payroll.css";
import { Link, Outlet } from "react-router-dom";
import PayrollTable from "../SmallComponents/PayrollTable";
import { motion } from "framer-motion";

const Payroll = () => {
  const [clickStyle, setClickStyle] = useState(0);
  const [small, setSmall] = useState(false);
  return (
    <>
      <div style={{ margin:'1rem'}}>
      <div className="dashItems" >
        <div
          className={` ${clickStyle == 1 ? "activeSection" : ""} ${
            small ? " sections" : " section"
          } `}
          onClick={() => {
            setClickStyle(1);
            setSmall(true);
          }}
        ><motion.div whileHover={{ scale: 1.2}}>
          Engineering
          </motion.div>
        </div>

        <div
          className={` ${clickStyle == 2 ? "activeSection" : ""} ${
            small ? " sections" : " section"
          }`}
          onClick={() => {
            setClickStyle(2);
            setSmall(true);
          }}
        ><motion.div whileHover={{ scale: 1.2}}>
          Operations</motion.div>
        </div>

        <div
          className={` ${clickStyle == 3 ? "activeSection" : ""} ${
            small ? " sections" : " section"
          } `}
          onClick={() => {
            setClickStyle(3);
            setSmall(true);
          }}
        ><motion.div whileHover={{ scale: 1.2}}>
          Accounts</motion.div>
        </div>

        <div
          className={` ${clickStyle == 4 ? "activeSection" : ""} ${
            small ? " sections" : " section"
          } `}
          onClick={() => {
            setClickStyle(4);
            setSmall(true);
          }}
        ><motion.div whileHover={{ scale: 1.2}}>
          Supply Chain</motion.div>
        </div>
      </div>
      {
        clickStyle !== 0 && <PayrollTable clickedBtn = { clickStyle } />
      }
      </div>
    </>
  );
};

export default Payroll;
