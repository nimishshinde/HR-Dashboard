import React, { useState, useEffect } from "react";
import {
  Table,
  Tooltip,
  Space,
  Modal,
  Dropdown,
  Menu,
  Progress,
  notification,
} from "antd";
import TextArea from "antd/lib/input/TextArea";

import {
  DownOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.min.css";
import "./DashboardTableOne.css";

const DashboardTableOne = ({ clickedBtn }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState({});
  const [score1, setScore1] = useState(1);
  const [score3, setScore2] = useState(1);
  const [score2, setScore3] = useState(1);
  const [currentEmpId, setCurrentEmpId] = useState("");
  const [performanceMessage, setPerformanceMessage] = useState("");

  // ------------------------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------
  const showModal = (record) => {
    console.log(record);
    setVisible(true);
    setEmployeeDetails(record);
    setCurrentEmpId(record.id);
  };

  const updateDetails = () => {
    alert(score1, score2 , score3)

    if( performanceMessage.trim() == "" ){
      alert('Please enter Performance Message')
    }else{
      updatePerformanceMessage(performanceMessage);
    }

    setVisible(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const onRadioBtnChange = (e) => {
    setGetValue(e.target.value);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "key",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "key",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "key",
    },
    {
      title: "Performance",
      dataIndex: "performanceOfPerviousMonth",
      key: "key",
    },
    {
      title: "Shift",
      dataIndex: "shiftOfCurrentMonth",
      key: "key",
    },
  ];

  const onClick = ({ key }) => {
    setGetValue(key);
  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: "1st Shift",
          key: "1st Shift",
        },
        {
          label: "2nd Shift",
          key: "2nd Shift",
        },
        {
          label: "3rd Shift",
          key: "3rd Shift",
        },
        {
          label: "4th Shift",
          key: "4th Shift",
        },
      ]}
    />
  );

  const getDeparatmentName = (clickedBtn) => {
    switch (clickedBtn) {
      case 1:
        return "Engineering";
      case 2:
        return "Operations";
      case 3:
        return "Accounts";
      case 4:
        return "Supply Chain";
      default:
        return "Engineering";
    }
  };

  const fetchRequest = async () => {
    setLoading(true);

    let deparatmentName = getDeparatmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/deparatment/${deparatmentName}`,
    });
    console.log("from frontend Engineering", response.data);
    setAllRequest(response.data);
    response.status == 200 && setLoading(false);
  };
  useEffect(() => {
    fetchRequest();
  }, [clickedBtn]);

  const openNotificationWithIcon = (type, mes, des) => {
    notification[type]({
      message: mes,
      description: des,
    });
  };

  async function updatePerformanceMessage(text) {

    let totalScore = score1 + score2 + score3;
    alert( totalScore );
    alert(currentEmpId);

    let responseObj = await axios({
      method: "post",
      // url: `https://hr-dashboard-nimish.herokuapp.com/admin/performance/${currentEmpId}`,
      url: `http://localhost:5000/admin/performance/${currentEmpId}`,
      data: {
        performanceMessage: text,
        performanceScore: totalScore,
      },
    });

    responseObj.status == 200 ? (
      openNotificationWithIcon(
        "success",
        "Performance Message Update",
        ` Performance Message to Employee ${currentEmpId} has been updated`
      )
    ) : (
      <></>
    );
  }

  async function updateShiftHours() {
    let responseObj = await axios({
      method: "post",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/shift/${currentEmpId}`,
      data: { shift: getValue },
    });

    responseObj.status == 200 &&
      openNotificationWithIcon(
        "success",
        "Shift Hours Updated",
        `Shift hours of employee ${currentEmpId} has been updated`
      );

    setVisible(false);
  }

  function handleScore (num,score) {
    if(score < 1 || score > 10){
      alert("Please enter score between 1 to 10")
    }else{
      if(num == 1){
        setScore1(+score)
      }else if (num == 2){
        setScore2(+score)
      }else{
        setScore3(+score)
      }
    }
  }

  return (
    <div className="dtoc">
      <div>
        <Table
          loading={loading}
          style={{ padding: "5px" }}
          dataSource={allrequest}
          columns={columns}
          align={"right"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModal(record),
            };
          }}
        ></Table>
      </div>

      <Modal
        visible={visible}
        title="Employee Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="btncontainermodal">
            <div className="dbtnmodal approve">
              <div onClick={updateDetails} className="btntext">
                {" "}
                Update Perfomance{" "}
              </div>
            </div>
            <div className="dbtnmodal approve">
              <div onClick={updateShiftHours} className="btntext">
                {" "}
                Update Shift Hours{" "}
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="empdetails">
          <p id="name" className="parad">
            <strong>Name:</strong>{" "}
            <div className="blue">
              {employeeDetails.firstName + " " + employeeDetails.lastName}
            </div>
          </p>
          <p id="id" className="parad">
            <strong>ID: </strong>
            <div className="blue">{employeeDetails.id}</div>
          </p>
          <p id="department" className="parad">
            <Tooltip
              placement="leftTop"
              className="tooltip"
              title="Department And Designation"
              color={true ? "#6075fe" : "red"}
            >
              <div style={{ display: "flex", margin: "0", padding: "0" }}>
                <strong>D&D: </strong>
                <div className="blue">{employeeDetails.deparatment}</div>
              </div>
            </Tooltip>
          </p>
          <p id="phone" className="parad">
            <strong>Phone: </strong>
            <div className="blue">{employeeDetails.phoneNumber}</div>
          </p>
          <p id="address" className="parad">
            <strong>Address:</strong>
            <div className="blue">{employeeDetails.address}</div>
          </p>
          <p id="performance" className="parad">
            <strong>Performance {" "} : {" "} </strong>
            <div className="blue">
              {employeeDetails.performanceOfPerviousMonth} {"%"}
            </div>
          </p>
          <p id="shift" className="parad">
            <strong>Shift {" "}: {" "}</strong>
            <div className="blue">{ employeeDetails.shiftOfCurrentMonth }</div>
          </p>
        </div>

        <div>
          <div className="mcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong>Performance</strong>
          </div>
          <div className="econtainer" style={{ marginTop: "5px" }}>
            <div className="progress" style={{ margin: "0px" }}>
              <lable style={{ fontWeight: "700", fontSize: "1rem" }}>
                {" "}
                Communication{" "}
              </lable>
              <input
                onChange={(e) => handleScore(1, e.target.value)}
                min={1}
                max={10}
                placeholder="1 - 10"
                style={{
                  width: "40%",
                  padding: "0.5rem",
                  outline: "none",
                  border: "1px solid #6075fe",
                  borderRadius: "4px",
                  marginRight: "3rem",
                }}
                type="number"
              ></input>
            </div>
            <div className="progress" style={{ margin: "0px" }}>
              <lable style={{ fontWeight: "700", fontSize: "1rem" }}>
                {" "}
                Leadership{" "}
              </lable>
              <input
                onChange={(e) => handleScore(2, e.target.value)}
                min={1}
                max={10}
                placeholder="1 - 10"
                style={{
                  width: "40%",
                  padding: "0.5rem",
                  outline: "none",
                  border: "1px solid #6075fe",
                  borderRadius: "4px",
                  marginRight: "3rem",
                }}
                type="number"
              ></input>
            </div>
            <div className="progress" style={{ margin: "0px" }}>
              <lable style={{ fontWeight: "700", fontSize: "1rem" }}>
                {" "}
                Rating{" "}
              </lable>
              <input
                onChange={(e) => handleScore(3, e.target.value)}
                min={1}
                max={10}
                placeholder="1 - 10"
                style={{
                  width: "40%",
                  padding: "0.5rem",
                  outline: "none",
                  border: "1px solid #6075fe",
                  borderRadius: "4px",
                  marginRight: "3rem",
                }}
                type="number"
              ></input>
            </div>
            <div className="progress" style={{ margin: "0px" }}>
              <lable style={{ fontWeight: "700", fontSize: "1rem" }}>
                {" "}
                Performance Message:{" "}
              </lable>
              <textarea
                className="inputMessage"
                type="text"
                style={{
                  width: "40%",
                  padding: "0.5rem",
                  outline: "none",
                  border: "1px solid #6075fe",
                  borderRadius: "4px",
                  marginRight: "3rem",
                  color: "black",
                  fontWeight: "400",
                }}
                onChange={(e) => setPerformanceMessage(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <span
              style={{ color: "white", marginRight: "5px", marginBottom:'5px' }}
              className="material-symbols-outlined performanceIcon "
            >
              work_history
            </span>
            <strong>Select Shift Hours</strong>
          </div>
          <div className="econtainer">
            <div>
              <div>
                {" "}
                Shift Hours :{" "}
                <input
                  className="dinput"
                  readOnly
                  type="text"
                  value={getValue}
                />
              </div>
              <br />
              <Dropdown overlay={menu}>
                <Space>
                  Select shift hours
                  <DownOutlined />
                </Space>
              </Dropdown>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DashboardTableOne;
