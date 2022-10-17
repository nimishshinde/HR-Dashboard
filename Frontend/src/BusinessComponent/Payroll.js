import React, { useState, useEffect } from "react";
import "./Payroll.css";
import PayrollTable from "../SmallComponents/PayrollTable";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import "./Dashboard.css";
import { Link, Outlet } from "react-router-dom";
import EmployeePayroll from "./Employee/EmployeePayroll";

const Payroll = () => {
  const [clickStyle, setClickStyle] = useState(0);
  const [small, setSmall] = useState(false);
  const [employeeType, setEmp] = useState(2);

  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setEmp(userObj.employeeType);
    console.log(userObj);
  }, []);

  return (
    <>
      {userObj?.employeeType == 1 ? (
        <>
          <div className="dashItems"  >
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

          {clickStyle !== 0 && <PayrollTable clickedBtn={clickStyle} />}
          </div>
        </>
      ) : (
        <EmployeePayroll />
      )}
    </>
  );
};

export default Payroll;
