import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { Input, DatePicker, Space, notification } from "antd";
import "./EmployeeDailyUpdate.css";
import "antd/dist/antd.css";
import {TiTick} from "react-icons/ti";
import Todo from "./Todo";
// import useSelection from "antd/lib/table/hooks/useSelection";

const { TextArea } = Input;

function EmployeeDailyUpdate() {

  const userObj = useSelector(state => state);
  const dispatch = useDispatch();

  let tempUpdateObj = {
    taskHeading: "",
    taskDescription: "",
    taskCompletedDate: "",

    // <-future Scope----------------------------->
    taskId: Number,
  };

  const [updateTaskObj, setupdateTaskObj] = useState({
    taskHeading : '',
    taskDescription : '',
    taskCompletedDate : '',

    // <-future Scope----------------------------->
    taskId : Number,
  });

  useEffect(()=>{
    
  },[])

  function handleHeading(e) {
    setupdateTaskObj({...updateTaskObj, taskHeading : e.target.value});
  }

  function handleDate(date){
    let tempDate = moment(date).format("DD MM YYYY");
    setupdateTaskObj({ ...updateTaskObj, taskCompletedDate : tempDate })
  }

  function handleDescription(e) {
    let tempText = e.target.value;
    setupdateTaskObj({ ...updateTaskObj, taskDescription : tempText })  
  }

  async function updateTaskCompleted(){
    if(updateTaskObj.taskHeading !== '' && updateTaskObj.taskDescription !== '' && updateTaskObj.taskCompletedDate !== ''){
      let res = await axios({
        method: "post",
        url: `https://hr-dashboard-nimish.herokuapp.com/employee/updatetask/${userObj.id}`,
        data: updateTaskObj,
      });
      console.log(res.status === 200);
      if(res.status === 200){
        setupdateTaskObj( tempUpdateObj );
        notification.open({
          message: "Your task is updated !",
          icon: <TiTick style={{ fontSize: "1.5rem", color: "#4BB543" }} />,
        });  
      }

    }else{
      alert('Please Enter all the details of update task')
    } 
  }

  return (
    <div className="empupdate" >
      

      <div className="updatetxt">
        <div
          className="sendbtnctn"
          style={{
            color: "#7bd4fb",
            fontSize: "1.2rem",
            justifyContent: "flex-start",
            width: "22rem",
          }}
        >
          {" "}
          Update Daily Task{" "}
        </div>

        <div className="empflex">
          Task Heading{" "}
          <span>
            <Input
              value={updateTaskObj.taskHeading}
              placeholder="Heading"
              style={{ width: "16rem" }}
              onChange={(e) => handleHeading(e)}
            />
          </span>
        </div>
        <div className="empflex">
          Date of task
          <span>
            <DatePicker
              style={{ width: "16rem" }}
              placeholder="Date when task completed"
              onSelect={(date) => handleDate(date)}
            />
          </span>
        </div>
        <div className="empflex">
          {" "}
          Description
          <TextArea
            style={{ width: "16rem" }}
            placeholder="Description of the task completed"
            autoSize={{
              minRows: 3,
              maxRows: 6,
            }}
            onChange={(e) => handleDescription(e)}
            value={updateTaskObj.taskDescription}
          />
        </div>

        <div className="sendbtnctn">
          <div onClick={() => updateTaskCompleted()} className="sendbtn">
            {" "}
            Update{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

//

export default EmployeeDailyUpdate;
