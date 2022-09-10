import React, { useEffect, useState } from "react";
import Card from "../SmallComponents/Card";
import "./Leave.css";
import axios from "axios";

const Leave = () => {
  const [allrequest, setAllRequest] = useState([]);

  const fetchRequest = async () => {
    let response = await axios({
      method: "get",
      url: "http://localhost:5000/admin/leave",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    }).then(() => {
      console.log("from frontend leave", response.data);
      setAllRequest(response.data);
    });
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="mainstyle">
      <div className="heading"> Leave Management </div>
      {allrequest?.map((obj) => (
        <Card Obj={obj} />
      ))}
      {/* <Card/> */}
    </div>
  );
};

export default Leave;
