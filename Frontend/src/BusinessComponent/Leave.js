import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../SmallComponents/Card";
import EmployeeLeave from "./Employee/EmployeeLeave";
import "./Leave.css";
import axios from "axios";
import { Spin } from "antd";

const Leave = () => {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();

  const [stopSpinner, setStopSpinner] = useState(false);
  const [allrequest, setAllRequest] = useState([]);
  const [employeeType, setEmployeeType] = useState(userObj.employeeType);

  async function fetchReq() {
    try {
      let response = await axios({
        method: "get",
        url: `https://hr-dashboard-nimish.herokuapp.com/admin/leave`,
      });

      console.log(response);
      setAllRequest(response?.data);
      response && setStopSpinner(true);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    fetchReq();
    console.log("user obj from leave.js --> ", userObj);
    setEmployeeType(userObj.employeeType);
  }, [allrequest]);

  return (
    <>
      {employeeType === 1 ? (
        <div className="mainstyle">
          <div className="heading"> Leave Management </div>
          {stopSpinner == false ? (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "40vh",
                }}
              >
                <h1 style={{ color: "#6075fe", fontWeight: "600" }}>
                  {" "}
                  Loading Leaves{" "}
                  <span>
                    <Spin size="large" />
                  </span>
                </h1>
                {/* <Spin size="large" /> */}
              </div>
            </>
          ) : (
            <div style={{ height: "65vh", overflow : 'scroll'}}>
              {allrequest != [] &&
                allrequest?.map((obj) => (
                  <Card Obj={obj} fetchReq={fetchReq} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <EmployeeLeave />
      )}
    </>
  );
};

export default Leave;
