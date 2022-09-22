import React, { useState } from "react";
import EmployeePreviousLeave from "../../SmallComponents/EmployeePreviousLeave";
import axios from "axios";
import moment from "moment";

import { Input, DatePicker, Modal, notification } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "antd/dist/antd.min.css";
import "./EmployeeLeave.css";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function EmployeeLeave() {
  const obj = {
    employeName: "",
    employeId: "",
    designation: "",
    deparatment: "",
    remainingLeaves: "",
    leavesTakenInMonth: "",
    isApproved: false,
    isRejected: false,
    reasonOfLeave: "",
    noofDaysLeaveRequired: "",
    dateOfLeave: "",
    endOfLeave: "",
    isPending: true,
  };

  const [leaveObj, setLeaveObj] = useState(obj);
  const [responseObj, setResponseObj] = useState({});
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const applyCliked = () => {
    showModal();
  };

  const showModal = () => {
    setVisible(true);
    console.log("clicked");
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCalendarChange = (start, end) => {
    console.log(moment(start[0]?._d).format("Do MM YYYY"), "from moment");
    console.log(moment(start[1]?._d).format("Do MM YYYY"), "from moment");
    setLeaveObj((leaveObj) => ({
      ...leaveObj,
      dateOfLeave: moment(start[0]?._d).format("DD MMM YYYY"),
    }));
    setLeaveObj((leaveObj) => ({
      ...leaveObj,
      endOfLeave: moment(start[1]?._d).format("DD MMM YYYY"),
    }));

    let StartDate = moment(start[0]?._d);
    let EndDate = moment(start[1]?._d);

    //Difference
    const date1 = new Date(StartDate);
    const date2 = new Date(EndDate);
    const ans = date2.getTime() - date1.getTime();
    const diffDays = ans / (1000 * 60 * 60 * 24);

    const startDate = moment(start[0]?._d).format("D MMM YYYY");
    const endDate = moment(start[1]?._d).format("D MMM YYYY");

    setLeaveObj((leaveObj) => ({
      ...leaveObj,
      noofDaysLeaveRequired: diffDays,
    }));
  };

  const handleReasoneOfLeave = (text) => {
    setLeaveObj((prevObj) => ({ ...prevObj, reasonOfLeave: text }));
    setLeaveObj((prevObj) => ({ ...prevObj, employeName: "Test" }));
    setLeaveObj((prevObj) => ({ ...prevObj, designation: "TestDesignation" }));
    setLeaveObj((prevObj) => ({ ...prevObj, deparatment: "TestDeparatment" }));
    setLeaveObj((prevObj) => ({ ...prevObj, leavesTakenInMonth: 3 }));
    setLeaveObj((prevObj) => ({ ...prevObj, isPending: true }));
  };

  const openNotification = (placement) => {
    notification.open({
      message: "Leave Sent to Admin",
      description: `Your leave request of ${leaveObj.noofDaysLeaveRequired} days from ${leaveObj.dateOfLeave} to ${leaveObj.endOfLeave} is send to admin. Please wait until Admin Responses`,
      placement : 'bottomright',
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#6075fe",
          }}
        />
      ),
    });
  };

  const handleApplyLeave = async () => {
    console.log(leaveObj, "from handle Leave Fn");
    if (
      leaveObj.reasonOfLeave !== "" &&
      leaveObj.dateOfLeave !== "" &&
      leaveObj.endOfLeave !== "" &&
      leaveObj.noofDaysLeaveRequired !== ""
    ) {
      try {
        let response = axios({
          method: "post",
          url: "http://localhost:5000/admin/leave",
          data: leaveObj,
        });

        console.log((await response).status === 200, "response from backend");

        (await response).status === 200 && openNotification("bottomLeft");
        setResponseObj((await response).data);

        setTimeout(() => {
          setVisible(false);
        }, 1000);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <div className="emplev">
        <div className="levdate">
          <RangePicker
            bordered={false}
            format="YYYY-MM-DD"
            onCalendarChange={(start, end) => handleCalendarChange(start, end)}
          />
          <div className="applybtn" onClick={applyCliked}>
            {" "}
            Apply{" "}
          </div>
        </div>

        <div className="infotxt">
          <div>
            Remaining Leaves - <span className="hightxt"> {" 5"} </span>{" "}
          </div>
          <div>
            Leaves Taken This Month - <span className="hightxt"> {" 5"} </span>
          </div>
        </div>
      </div>

      <Modal
        visible={visible}
        title="Leave Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="btncontainermodal">
            <div className="btnmodal approve">
              <div
                className="btntext"
                style={{ fontSize: "1rem" }}
                onClick={() => handleApplyLeave()}
              >
                {" "}
                Apply Leave{" "}
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="modaltxt">
          {" "}
          Requesting Leave From{" "}
          <span className="hightxt">
            {leaveObj.dateOfLeave === ""
              ? "( Please select a date )"
              : leaveObj.dateOfLeave}
          </span>{" "}
          for{" "}
          <span className="hightxt">
            {" "}
            {leaveObj.noofDaysLeaveRequired === ""
              ? "( Please select a start and end date ) "
              : leaveObj.noofDaysLeaveRequired}{" "}
          </span>{" "}
          that will be till{" "}
          <span className="hightxt">
            {" "}
            {leaveObj.endOfLeave === ""
              ? "( Please select a date )"
              : leaveObj.endOfLeave}{" "}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.8rem",
            marginBottom: "0.8rem",
            fontWeight: "600",
          }}
        >
          {" "}
          Reason of Leave{" "}
        </div>
        <TextArea
          rows={5}
          placeholder="Please write down the reason for leave "
          maxLength={300}
          onChange={(e) => handleReasoneOfLeave(e.target.value)}
          minLength={60}
        />
      </Modal>

      <div>
        <EmployeePreviousLeave pendingObj={responseObj} />
      </div>
    </>
  );
}

export default EmployeeLeave;
