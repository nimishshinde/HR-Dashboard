import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import RaiseIssueModal from "../../SmallComponents/RaiseIssueModal";

import { BiRupee } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import { VscWorkspaceUntrusted } from "react-icons/vsc";
import "./EmployeePayroll.css";
import axios from "axios";

function EmployeePayroll() {
  const [raiseIssueModal, setRaiseIssueModal] = useState(false);
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();


  const monthlyPay = Math.ceil(userObj.PayrollMangement.salary / 12);
  const dayPay = Math.ceil(monthlyPay / 30);

  async function updateSalary(sal) {
    
    let responseObj = await axios({
      method: "post",
      url: `http://localhost:5000/admin/salary/${userObj.id}`,
      data: {
        salary: sal,
      },
    });

    dispatch({
      type : 'login',
      payload : responseObj.data
    })
  }

  return (
    <div className="mainstyle">
      <div className="headingtxt">
        {" "}
        <span className="cardtxt"> Home / </span> Payroll Management{" "}
      </div>

      <div className="btnctn">
        <div className="btnpr editbtn" 
        // onClick={updateSalary(10)}
        >
          {" "}
          <span>
            {" "}
            <FaEdit
              style={{
                paddingTop: "7px",
                fontSize: "20px",
              }}
            />{" "}
          </span>{" "}
          Edit
        </div>

        <div
          className="btnpr raiseissuebtn"
          onClick={() => setRaiseIssueModal(true)}
        >
          <span>
            {" "}
            <VscWorkspaceUntrusted
              style={{
                paddingTop: "7px",
                fontSize: "20px",
                fontWeight: "800",
              }}
            />{" "}
          </span>
          Raise Issue{" "}
        </div>
      </div>

      <RaiseIssueModal
        raiseIssueModal={raiseIssueModal}
        setRaiseIssueModal={setRaiseIssueModal}
      />

      <div className="empprstyle" style={{ width: "100%" }}>
        <div style={{ width: "50%" }}>
          <h2>
            {" "}
            <span className="cardtxt"> Name : </span>{" "}
            {userObj.firstName + " " + userObj.lastName}
          </h2>

          <h3>
            {" "}
            <span className="cardtxt"> Department :</span> {userObj.deparatment}{" "}
          </h3>

          <div className="empprstyle" style={{ width: "90%" }}>
            <div className="cardpr">
              <div className="cardtxt"> Salary credited </div>
              <div className="cardamt">
                {userObj.salaryCreditedThisMonth == "" ||
                userObj.salaryCreditedThisMonth == undefined ||
                userObj.salaryCreditedThisMonth == false
                  ? "No"
                  : "Yes"}
              </div>
            </div>
            <div className="cardpr">
              <div className="cardtxt">Half Day</div>
              <div className="cardamt">
                {userObj.PayrollMangement.halfDayTaken == ""
                  ? "0"
                  : userObj.PayrollMangement.halfDayTaken}
              </div>
            </div>
          </div>

          <div className="empprstyle" style={{ width: "90%" }}>
            <div className="cardpr">
              <div className="cardtxt">Leaves ( Month )</div>
              <div className="cardamt">{userObj.leavesTakenInMonth}</div>
            </div>
            <div className="cardpr">
              <div className="cardtxt">Leaves ( Year )</div>
              <div className="cardamt">{userObj.leavesTakenInYear}</div>
            </div>
          </div>

          <div className="empprstyle" style={{ width: "90%" }}>
            <div className="cardpr">
              <div className="cardtxt">Leaves ( Paid )</div>
              <div className="cardamt">{userObj.paidLeavesRemaining}</div>
            </div>
            <div className="cardpr">
              <div className="cardtxt">Shift </div>
              <div className="cardamt">{userObj.shiftOfCurrentMonth}</div>
            </div>
          </div>
        </div>

        <div className="" style={{ width: "50%" }}>
          <div className="paymentdetails">
            <div className="cardpr">
              <div className="cardtxt">Monthly Pay</div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                  }}
                >
                  <BiRupee />
                </div>
                <div>{monthlyPay}/-</div>
              </div>
            </div>

            <div className="cardpr">
              <div className="cardtxt">This Month</div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  <BiRupee />
                </div>
                <div>
                  {monthlyPay - userObj.leavesTakenInMonth * dayPay} /-{" "}
                </div>
              </div>
            </div>
          </div>

          <div className="longcardctn">
            <div className="longcardpr">
              <div className="cardtxt"> Yearly Pay </div>
              <div className="cardamt">
                <div
                  style={{
                    paddingTop: "7px",
                    color: "#5FD068",
                    fontSize: "18px",
                    fontWeight: "800",
                  }}
                >
                  <BiRupee />
                </div>
                <div>
                  {" "}
                  {userObj.PayrollMangement.salary} + 50K{" "}
                  <span className="cardtxt"> (Performance)</span>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // in admin payroll add monthly and yearly pay of the person
    // add avatart in the table
    // add a property to user obj of monthly & yearly pay
    // and find out the total buget(salary) of that deparatment
    // Search Options
  );
}

export default EmployeePayroll;
