import React, { useState, useEffect } from "react";
import { Table, Radio, Space, Modal } from "antd";
import "antd/dist/antd.min.css";
import "./Engineering.css";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Engineering = () => {
  const [loading, setLoading] = useState(false);
  const [employeeModal, setEmployeeModal] = useState(false);
  const [getValue, setGetValue] = useState("First");
  const [allrequest, setAllRequest] = useState([]);
  const [employeeDetails, setEmployeeDetails] = useState({});

  const navigate = useNavigate();
  console.log(navigate, "Engineering-Navigate");

  const location = useLocation();
  console.log(location.pathname.split("/")[location.pathname.split("/").length-1], 'Engineering-location');

  const fetchRequest = async () => {
    let response = await axios({
      method: "get",
      url: "http://localhost:5000/admin/leave",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    console.log("from frontend Engineering",response.data);
    setAllRequest(response.data);
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setGetValue(e.target.value);
  };

  const showEmployee = (record) => {
    setEmployeeDetails(record);
    setEmployeeModal(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEmployeeModal(false);
    }, 3000);
  };

  const employeeCancel = () => {
    setEmployeeModal(false);
  };

const updateDetails = () => {
  setEmployeeDetails({...employeeDetails, shift: getValue , remainingLeaves: 105})
  console.log(getValue);
  console.log(employeeDetails);
}


  // const data = [{
  //     id : 1,
  //     name: "name 1",
  //     phone: '9465131234',
  //     address: 'address',
  //     performance : "Not Calculated",
  //     shift: '00',
  //     key : '1'
  // },{
  //     id : 2,
  //     name: "name 2",
  //     phone: '9465131234',
  //     address: 'address',
  //     performance : "Not Calculated",
  //     shift: '00',
  //     key : '2'
  // },{
  //     id : 3,
  //     name: "name 3",
  //     phone: '9465131234',
  //     address: 'address',
  //     performance : "Not Calculated",
  //     shift: '00',
  //     key : '3',
  // },{
  //     id : 4,
  //     name: "name 4",
  //     phone: '9465131234',
  //     address: 'address',
  //     performance : "Not Calculated",
  //     shift: '00',
  //     key : '4'
  // }
  // ]

  const columns = [
    {
      title: "ID",
      dataIndex: "employeId",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "employeName",
      key: "key",
    },
    {
      title: "Phone",
      dataIndex: "remainingLeaves",
      key: "key",
    },
    {
      title: "Address",
      dataIndex: "reasonOfLeave",
      key: "key",
    },
    {
      title: "Performance",
      dataIndex: "noofDaysLeaveRequired",
      key: "key",
    },
    {
      title: "Shift",
      dataIndex: "leavesTakenInMonth",
      key: "key",
    },
  ];

  return (
    <div
      style={{
        marginTop: "1rem",
        marginLeft: "4rem",
        marginRight: "4rem",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
      }}
    >
      <div>
        <Table
          style={{ padding: "5px" }}
          dataSource={allrequest}
          columns={columns}
          align={"right"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                showEmployee(record);
              },
            };
          }}
          


        ></Table>
      </div>

      <Modal
        open={employeeModal}
        title="Employee Details"
        onOk={handleOk}
        onCancel={employeeCancel}
        footer={[
          <div className="btncontainermodal">
            <div className="btnmodal approve">
              <div onClick={updateDetails} className="btntext"> Update </div>
            </div>
          </div>
        ]}
      >
        <div className="empDetails">
          <div>
            <p>
              <strong>Name:</strong> <br /> {employeeDetails.employeName}
            </p>
            <p>
              <strong>ID: </strong> <br />
              {employeeDetails.employeId}
            </p>
            <p>
              <strong>Phone: </strong> <br />
              {employeeDetails.remainingLeaves}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> <br />
              {employeeDetails.reasonOfLeave}
            </p>
            <p>
              <strong>Performance:</strong> <br />
              {employeeDetails.noofDaysLeaveRequired}
            </p>
            <p>
              <strong>Shift:</strong>
              <br /> {getValue}
            </p>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <strong>Select Shift Hours</strong>
          </div>
          <div className="econtainer">
            <Radio.Group onChange={onChange}>
              <Space direction="vertical">
                <Radio value={"First"}>First Shift</Radio>
                <Radio value={"Second"}>Second Shift</Radio>
                <Radio value={"Third"}>Third Shift</Radio>
                <Radio value={"Fourth"}>Fourth Shift</Radio>
              </Space>
            </Radio.Group>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <strong>Performance</strong>
          </div>
          <div className="econtainer">
            <p>Performance Not Calculated Yet</p>
            <p>Performance Not Calculated Yet</p>
            <p>Performance Not Calculated Yet</p>
            <p>Performance Not Calculated Yet</p>
            <p>Performance Not Calculated Yet</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Engineering;
