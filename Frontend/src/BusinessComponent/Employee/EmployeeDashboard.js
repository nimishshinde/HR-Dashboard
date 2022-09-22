import React from "react";
import { useSelector, useDispatch } from "react-redux";
import EmployeeCalendar from "../../SmallComponents/EmployeeCalendar";
import EmployeeDailyUpdate from "../../SmallComponents/EmployeeDailyUpdate";

import { Progress, Tooltip } from "antd";
import { FcClock } from "react-icons/fc";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRaiseIssue = () => {
    alert("Raise Issue was clicked... !!");
  };

  return (
    <>
      <div>
        <div className="empdash">
          <div style={{ width: "55%", marginTop: "1rem" }}>
            {" "}
            <EmployeeCalendar />{" "}
          </div>
          <div style={{ display: "flex" }}>
            <Tooltip
              placement="leftTop"
              className="tooltip"
              title={
                userObj.performanceMessage?.length == 0
                  ? "No Performance Message yet"
                  : userObj.performanceMessage
              }
              color={true ? "#6075fe" : "red"}
            >
              <div className="cardstyle">
                {" "}
                Perfomance
                <div className="progress">
                  <Progress
                    type="circle"
                    percent={userObj.performanceOfPerviousMonth}
                    width={120}
                    status={
                      userObj.performanceOfPerviousMonth < 35
                        ? "exception "
                        : ""
                    }
                  />
                </div>
              </div>
            </Tooltip>

            <div>
              <div className="shift">
                <FcClock fontSize="3rem" />
                <div className="shifttext">
                  <div style={{ color: "rgb(23, 43, 77)" }}>1st Shift</div>
                  <div style={{ color: "#7bd4fb" }}>4pm to 12pm</div>
                </div>

                <div className="issuebtn" onClick={handleRaiseIssue}>
                  Raise Issue
                </div>
              </div>
            </div>
          </div>
        </div>

        <div> 
          <EmployeeDailyUpdate />
        </div>
        
      </div>
    </>
    // Add pay day in calendar
    // Employee and admin dashboard should also show date
  );
}

export default EmployeeDashboard;
