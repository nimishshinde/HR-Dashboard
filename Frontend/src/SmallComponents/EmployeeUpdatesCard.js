import React from "react";
import moment from "moment";
import { AiTwotoneDelete, AiOutlineDelete } from "react-icons/ai";
import "./EmployeeUpdatesCard.css";

function EmployeeUpdatesCard({ data }) {
  return (
    <>
      {" "}
      {data.taskId ? (
        <div className="maincardctn">
          <small className="smalltxt"> {data.taskId} </small>
          <div className="cardflex">
            <div className="headingtxt"> {data.taskHeading} </div>
            <small className="smalltxt">
              {" "}
              {moment(data.taskCompletedDate).format("MMM Do YYYY")}{" "}
            </small>
          </div>
          <div style={{ height: "3rem"}}>
            {" "}
            <small className="smalltxt"> Description : </small>{" "}
            {data.taskDescription.length > 80
              ? data.taskDescription.substring(0, 80) + " ..."
              : data.taskDescription}{" "}
          </div>
          <div style={{ textAlign: "right", marginTop: "10px" }}>
            {" "}
            <span>
              {" "}
              <AiOutlineDelete className="deleteicon" size={22} />{" "}
            </span>{" "}
          </div>
        </div>
      ) : null}{" "}
    </>
  );
}

export default EmployeeUpdatesCard;
