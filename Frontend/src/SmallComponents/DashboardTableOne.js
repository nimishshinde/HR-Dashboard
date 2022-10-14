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
  const [score, setScore] = useState(0);
  const [currentEmpId, setCurrentEmpId] = useState("");
  const [performanceMessage, setPerformanceMessage] = useState("");

  // ------------------------------------------------------------------------------------------------------------------------------
  const increaseScore = () => {
    if (score < 10) {
      setScore(score + 1);
    }
  };

  const decreaseScore = () => {
    if (score > 0) {
      setScore(score - 1);
    }
  };
  // --------------------------------------------------------------------------------------------------------------
  const showModal = (record) => {
    console.log(record);
    setVisible(true);
    setEmployeeDetails(record);
    setCurrentEmpId(record.id);
  };

  const updateDetails = () => {
    updatePerformanceMessage(performanceMessage);
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
      dataIndex: "leavesTakeInTheMonth",
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
      url: `http://localhost:5000/admin/deparatment/${deparatmentName}`,
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
    let responseObj = await axios({
      method: "post",
      url: `http://localhost:5000/admin/performance/${currentEmpId}`,
      data: {
        performanceMessage: text,
        performanceScore: 35,
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
                Update{" "}
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
            <strong>Performance:</strong>
            <div className="blue">
              {employeeDetails.performanceOfPerviousMonth}
            </div>
          </p>
          <p id="shift" className="parad">
            <strong>Shift:</strong>
            <div className="blue">{getValue}</div>
          </p>
        </div>

        <div>
          <div className="mcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong>Performance</strong>
          </div>
          <div className="econtainer progress">
            <div className="progressContainer">
              <p className="parad">
                <strong>Leaves Taken In Month: </strong>
                <div className="blue">{employeeDetails.leavesTakenInMonth}</div>
              </p>
              <p className="parad">
                <strong>Tasks of the Month: </strong>
                <div className="blue">{employeeDetails.tasksOfTheMonth}</div>
              </p>
              <div className="progressBar">
                {" "}
                <strong>Perfomance</strong>
                <div className="progress">
                  <Progress
                    type="circle"
                    percent={employeeDetails.performanceOfPerviousMonth}
                    width={120}
                    status={
                      employeeDetails.performanceOfPerviousMonth < 35
                        ? "exception "
                        : ""
                    }
                  />
                </div>
              </div>
            </div>
            <div className="progressContainer">
              <p className="parad" style={{ marignBottom: "12px" }}>
                <strong>Rate {employeeDetails.firstName}: </strong>

                <input
                  className="inputRate"
                  value={score}
                  type="number"
                  readOnly
                />
                <div className="upsdowns">
                  <button className="ups">
                    <CaretUpOutlined
                      onClick={increaseScore}
                      style={{
                        height: "1.2rem",
                        fontSize: "20px",
                        textAlign: "center",
                        color: "#6ff16f",
                        cursor: "default",
                      }}
                    />
                  </button>
                  <button className="downs">
                    <CaretDownOutlined
                      onClick={decreaseScore}
                      style={{
                        height: "1.2rem",
                        fontSize: "20px",
                        textAlign: "center",
                        color: "red",
                        cursor: "default",
                      }}
                    />
                  </button>
                </div>
              </p>

              <p className="parad">
                <strong>Tasks completed: </strong>{" "}
                <div className="blue">
                  {employeeDetails.tasksCompletedInMonth}
                </div>
              </p>
              <p style={{ marginBottom: "0" }}>
                <strong>Performance message:</strong>{" "}
                <textarea
                  className="inputMessage"
                  type="text"
                  onChange={(e) => setPerformanceMessage(e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <span
              style={{ color: "#6075fe", marginRight: "5px" }}
              className="material-symbols-outlined"
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
