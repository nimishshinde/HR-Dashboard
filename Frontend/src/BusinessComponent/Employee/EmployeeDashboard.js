import React from "react";
import "./EmployeeDashboard.css";
import { Progress, Tooltip } from "antd";
import { FcClock } from "react-icons/fc";



function EmployeeDashboard() {

  const handleRaiseIssue = () => {
    alert("Raise Issue was clicked... !!");
  }

  return (
    <>
      <div className="empdash">
        <div> Nimish Shinde </div>
        <div style={{display:"flex"}} >
          <Tooltip
            placement="leftTop"
            className="tooltip"
            title="Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu"
            color={true ? "#6075fe" : "red"}
          >
            <div className="cardstyle">
              {" "}
              Perfomance
              <div className="progress">
                <Progress
                  type="circle"
                  percent={35}
                  width={120}
                  status={35 < 35 ? "exception " : ""}
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
    </>
  );
}

export default EmployeeDashboard;
