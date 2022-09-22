import React, { useEffect, useState } from "react";
import Card from "../SmallComponents/Card";
import EmployeeLeave from "./Employee/EmployeeLeave";
import "./Leave.css";
import axios from "axios";

const Leave = () => {
  const [allrequest, setAllRequest] = useState([]);
  const [employeeType, setEmployeeType] = useState(1);

  console.log(allrequest, 'from leaves');

  async function fetchReq () {
    try {
      let response = await axios({
        method: "get",
        url: "http://localhost:5000/admin/leave",
      });

      console.log(response);
      setAllRequest(response?.data);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(()=>{
    fetchReq();
  }, []);

  return (
    <>
      {employeeType == 1 ? (
        <div className="mainstyle">
          <div className="heading"> Leave Management </div>
          {allrequest != [] && allrequest?.map((obj) => <Card Obj={obj} />)}
        </div>
      ) : (
        <EmployeeLeave />
      )}
    </>
  );
};

export default Leave;
