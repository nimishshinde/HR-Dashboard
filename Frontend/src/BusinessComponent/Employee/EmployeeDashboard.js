import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RaiseIssueModal from "../../SmallComponents/RaiseIssueModal";
import EmployeeDailyUpdate from "../../SmallComponents/EmployeeDailyUpdate";

import { Progress, Tooltip, notification } from "antd";
import { FcClock } from "react-icons/fc";
import { TiTick } from "react-icons/ti";
import "./EmployeeDashboard.css";
import Todo from "../../SmallComponents/Todo";

function EmployeeDashboard() {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();

  const [raiseIssueModal, setRaiseIssueModal] = useState(false);
  const handleRaiseIssue = () => {
    setRaiseIssueModal(true)
  };

  return (
    <>
      <div className="empdashboard">
        <div className="empdash">
          <div>
            <EmployeeDailyUpdate />
          </div>
          <div style={{ display: "flex" }}>
            <Tooltip
              placement="leftTop"
              className="tooltip"
              title={
                userObj.performanceMessage == ""
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
                  <div style={{ color: "rgb(23, 43, 77)" }}>
                    {userObj.shiftOfCurrentMonth == ""
                      ? "Not Allocated"
                      : userObj.shiftOfCurrentMonth}
                  </div>
                  <div style={{ color: "#7bd4fb" }}>4pm to 12pm
                    
                  </div>
                </div>

                <div className="issuebtn" onClick={handleRaiseIssue}>
                  Raise Issue
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Todo />
        </div>
      </div>

      <RaiseIssueModal
        raiseIssueModal={raiseIssueModal}
        setRaiseIssueModal={setRaiseIssueModal}
      />

      {/* <Modal
        title="This message will be sent to the admin"
        visible={raiseIssueModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="footerctn" onClick={handleUpdate}>
            {" "}
            <div className="footerbtn"> Send </div>{" "}
          </div>,
        ]}
      >
        <TextArea
          rows={5}
          placeholder="Please write down the Issue"
          maxLength={300}
          onChange={(e) => handleIssue(e.target.value)}
          minLength={60}
        />
      </Modal> */}
    </>
    // Add pay day in calendar
    // Employee and admin dashboard should also show todays date
  );
}

export default EmployeeDashboard;
