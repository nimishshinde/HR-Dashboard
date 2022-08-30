import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import moment from "moment";
import "./Card.css";
import "antd/dist/antd.css";

function Card({ Obj }) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
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
  return (
    <>
      <div className="cardmainstyle">
        <div className="card" onClick={showModal}>
          <div style={{ color: "rgb(53, 66, 89)", width: "60%" }}>
            <div className="name">
              <div className="namestyle">
                <div>{Obj.employeName} </div>
                {/* <div className="smalltext" style={{marginLeft: "1rem", fontSize:"1.2rem", fontWeight:"400"}} > { "( " + moment(Obj.dateOfLeave).format('MMMM Do YYYY, h:mm:ss a') + " )"} </div> */}
                <div
                  className="smalltext"
                  style={{
                    marginLeft: "1rem",
                    fontSize: "1.2rem",
                    fontWeight: "400",
                  }}
                >
                  {" "}
                  {"( " +
                    moment(Obj.dateOfLeave).format("MMMM Do YYYY") +
                    " )"}{" "}
                </div>
              </div>

              <div className="smalltext">
                {" "}
                {Obj.designation + ", " + Obj.deparatment}{" "}
              </div>
            </div>
            <div className="smalltext ">
              {Obj.reasonOfLeave.length > 150
                ? "Subject : " +
                  Obj.reasonOfLeave.substring(0, 150) +
                  "...showmore"
                : "Subject : " + Obj.reasonOfLeave}
            </div>
            <div className="smalltext">
              {" "}
              Leaves Taken this Month : {Obj.leavesTakenInMonth} and Remaining
              Leaves : {Obj.remainingLeaves}
            </div>
          </div>

          <div className="btncontainer">
            <div className="btn approve">
              <div className="btntext"> Approve </div>
            </div>
            <div className="btn reject">
              <div className="btntext"> Reject </div>
            </div>
          </div>
        </div>

        <Modal
          visible={visible}
          title="Title"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="btncontainermodal">
              <div className="btnmodal approve">
                <div className="btntext"> Approve </div>
              </div>
              <div className="btnmodal reject">
                <div className="btntext"> Reject </div>
              </div>
            </div>,
          ]}
        >
          <div style={{ color: "rgb(53, 66, 89)" }}>
            <div className="name">
              {Obj.employeName}
              <div className="smalltext">
                {" "}
                {Obj.designation + ", " + Obj.deparatment}{" "}
              </div>
            </div>
            <div className="smalltext ">
              {Obj.reasonOfLeave.length > 150
                ? "Subject : " +
                  Obj.reasonOfLeave.substring(0, 150) +
                  "...showmore"
                : "Subject : " + Obj.reasonOfLeave}
            </div>
            <div className="smalltext">
              {" "}
              Leaves Taken this Month : {Obj.leavesTakenInMonth} and Remaining
              Leaves : {Obj.remainingLeaves}
            </div>
            <div className="smalltext">Date of Leave :{Obj.dateOfLeave}</div>
            <div className="smalltext">
              Number of days :{Obj.noofDaysLeaveRequired}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default Card;
