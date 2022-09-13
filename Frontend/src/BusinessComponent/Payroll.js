import React, { useState } from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";

const Payroll = () => {
  const [clickStyle, setClickStyle] = useState(1);
  const [small, setSmall] = useState(false);
  return (
    <>
      <div className="dashItems">
        <Link to="/home/dashboard/Engineering">
          <div
            className={` ${clickStyle == 1 ? "activeSection" : ""} ${
              small ? " sections" : " section"
            } `}
            onClick={() => {
              setClickStyle(1);
              setSmall(true);
            }}
          >
            Engineering
          </div>
        </Link>
        <Link to="/home/dashboard/Operations">
          <div
            className={` ${clickStyle == 2 ? "activeSection" : ""} ${
              small ? " sections" : " section"
            }`}
            onClick={() => {
              setClickStyle(2);
              setSmall(true);
            }}
          >
            Operations
          </div>
        </Link>
        <Link to="/home/dashboard/Accounts">
          <div
            className={` ${clickStyle == 3 ? "activeSection" : ""} ${
              small ? " sections" : " section"
            } `}
            onClick={() => {
              setClickStyle(3);
              setSmall(true);
            }}
          >
            Accounts
          </div>
        </Link>
        <Link to="/home/dashboard/SupplyChain">
          <div
            className={` ${clickStyle == 4 ? "activeSection" : ""} ${
              small ? " sections" : " section"
            } `}
            onClick={() => {
              setClickStyle(4);
              setSmall(true);
            }}
          >
            Supply Chain
          </div>
        </Link>
      </div>
      <Outlet />
    </>
  );
};

export default Payroll;
