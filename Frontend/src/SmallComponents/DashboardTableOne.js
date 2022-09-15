import React, { useState, useEffect } from "react";
import { Table, Radio, Space, Modal, Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import "./DashboardTableOne.css";
import "antd/dist/antd.min.css";

const DashboardTableOne = ({ clickedBtn }) => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [employeeDetails, setEmployeeDetails] = useState({});

  const showModal = (record) => {
    console.log(record);
    setVisible(true);
    setEmployeeDetails(record);
  };

  const updateDetails = () => {
    setEmployeeDetails({
      ...employeeDetails,
      shift: getValue,
      remainingLeaves: 110,
    });
    console.log(employeeDetails, "From Update");
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
      dataIndex: "leavesTakenInMonth",
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
        return "Product";
      case 3:
        return "HR";
      case 4:
        return "Product";
      default:
        return "Engineering";

      // HR Product
    }
  };

  const fetchRequest = async () => {
    let deparatmentName = getDeparatmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `http://localhost:5000/admin/deparatment/${deparatmentName}`,
    });
    console.log("from frontend Engineering", response.data);
    setAllRequest(response.data);
  };

  useEffect(() => {
    fetchRequest();
  }, [clickedBtn]);

  return (
    <div
      style={{
        marginTop: "1rem",
        marginLeft: "4rem",
        marginRight: "4rem",
        borderRadius: "5px",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        width: "100%",
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
              onClick: () => showModal(record),
            };
          }}
        ></Table>
      </div>

      <Modal
        visible={visible}
        title="Request For Leaves"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="btncontainermodal">
            <div className="btnmodal approve">
              <div onClick={updateDetails} className="btntext">
                {" "}
                Update{" "}
              </div>
            </div>
          </div>,
        ]}
      >
        <div className="empDetails">
          <div>
            <p>
              <strong>Name:</strong> <br /> {employeeDetails.firstName}
            </p>
            <p>
              <strong>ID: </strong> <br />
              {employeeDetails.id}
            </p>
            <p>
              <strong>Phone: </strong> <br />
              {employeeDetails.phoneNumber}
            </p>
          </div>
          <div>
            <p>
              <strong>Address:</strong> <br />
              {employeeDetails.address}
            </p>
            <p>
              <strong>Performance:</strong> <br />
              {employeeDetails.performanceOfPerviousMonth}
            </p>
            <p>
              <strong>Shift:</strong>
              <br /> {getValue}
            </p>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <strong>Performance</strong>
          </div>
          <div className="econtainer">
            <div style={{ padding: "1rem" }}>
              <label>Label 1</label>
              <input style={{ borderRadius: "5px" }} type="text" />
            </div>
            <div style={{ padding: "1rem" }}>
              <label>Label 2</label>
              <input style={{ borderRadius: "5px" }} type="text" />
            </div>
            <div style={{ padding: "1rem" }}>
              <label>Label 3</label>
              <input style={{ borderRadius: "5px" }} type="text" />
            </div>
          </div>
        </div>

        <div>
          <div className="mcontainer">
            <strong>Select Shift Hours</strong>
          </div>
          <div className="econtainer">
            {/* <Radio.Group onChange={onRadioBtnChange}>
              <Space direction="vertical">
                <Radio value={"First"}>First Shift</Radio>
                <Radio value={"Second"}>Second Shift</Radio>
                <Radio value={"Third"}>Third Shift</Radio>
                <Radio value={"Fourth"}>Fourth Shift</Radio>
                <input type="text" />
              </Space>
            </Radio.Group> */}
            <div>
              <div>
                {" "}
                Shift Hours : <input readOnly type="text" value={getValue} />
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
