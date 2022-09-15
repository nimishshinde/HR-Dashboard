import React, { useState } from "react";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import PayrollTable from "../SmallComponents/PayrollTable";

const Payroll = () => {
  const [clickStyle, setClickStyle] = useState(0);
  const [small, setSmall] = useState(false);
  return (
    <>
      <div className="dashItems">
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
      </div>
      {
        clickStyle !== 0 && <PayrollTable clickedBtn = { clickStyle } />
      }
    </>
  );
};

export default Payroll;
