import React from "react";
import "./EmployeeDailyUpdate.css";
import { Input, DatePicker, Space } from "antd";
import "antd/dist/antd.css";

const { TextArea } = Input;

function EmployeeDailyUpdate() {
  return (
    <div className="empupdate">
      <div> Task Assiged </div>
      <div> Task Completed </div>

      <div className="updatetxt">
        <div
          className="sendbtnctn"
          style={{
            color: "#7bd4fb",
            fontSize: "1.2rem",
            justifyContent: "flex-start",
          }}
        >
          {" "}
          Update Daily Task{" "}
        </div>
        <div className="empflex">
          Task Heading{" "}
          <span>
            <Input placeholder="Heading" style={{ width: "16rem" }} />
          </span>
        </div>
        <div className="empflex">
          Date of task
          <span>
            <DatePicker
              style={{ width: "16rem" }}
              placeholder="Date when task completed"
            />
          </span>
        </div>
        <div className="empflex">
          {" "}
          Description
          {/* <TextArea showCount maxLength={100}  /> */}
          <TextArea
            style={{ width: "16rem" }}
            placeholder="Description of the task completed"
            autoSize={{
              minRows: 3,
              maxRows: 6,
            }}
          />
        </div>

        <div className="sendbtnctn">
          <div className="sendbtn"> Update </div>
        </div>
      </div>
    </div>
  );
}

//

export default EmployeeDailyUpdate;
