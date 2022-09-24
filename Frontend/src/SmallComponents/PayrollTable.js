import React, { useEffect, useState } from "react";
import { Table, Radio, Space, Modal, Button, Dropdown, Menu } from "antd";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";
import "./PayrollTable.css";

function PayrollTable({ clickedBtn }) {
  let Obj = [];

  const [mainData, setMainData] = useState(Obj);

  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState([]);

  const getDepartmentName = (clickedBtn) => {
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
    }
  };

  const fetchRequest = async () => {
    let departmentName = getDepartmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/deparatment/${departmentName}`,
    });
    console.log("from frontend payroll engineering", response.data);
    setAllRequest(response.data);

    response?.data.map((obj, idx) => {
      setMainData((mainData) => [
        ...mainData,
        [
          obj.id,
          obj.firstName + " " + obj.lastName,
          obj.email,
          obj.PayrollMangement?.halfDayTaken,
          obj.leavesTakenInMonth,
          obj.PayrollMangement?.salaryCreditedThisMonth == ""
            ? "Not Credited"
            : `${obj.PayrollMangement?.salaryCreditedThisMonth}`,
        ],
      ]);
    });
    console.log(mainData[0][1], "from PayrollTable maindata01");
  };

  useEffect(() => {
    setMainData([]);

    fetchRequest();
  }, [clickedBtn]);

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

  const showModal = (record, rowIndex) => {
    setVisible(true);
    setEmployeeDetails(record);
  };

  const updateDetails = () => {
    // setEmployeeDetails({...employeeDetails, shift: getValue , remainingLeaves: 110});
  };

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

  const columns = [
    {
      title: "ID",
      dataIndex: "0",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "1",
      key: "key",
    },
    {
      title: "Email",
      dataIndex: "2",
      key: "key",
    },
    {
      title: "Half Days",
      dataIndex: "3",
      key: "key",
    },
    {
      title: "Leaves Taken(Month)",
      dataIndex: "4",
      key: "key",
    },
    {
      title: "Salary Credited",
      dataIndex: "5",
      key: "key",
    },
  ];

  return (
    <div className="dtoc">
      <div>
        <Table
          style={{ padding: "5px" }}
          dataSource={mainData}
          columns={columns}
          align={"center"}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => showModal(record, rowIndex),
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
            <div
              style={{ border: "1px solid #6075fe" }}
              className="btnmodal approve"
            >
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
            <p className="detail">
              <strong>Name:</strong>{" "}
              <div className="blue">{employeeDetails[1]}</div>
            </p>
            <p className="detail">
              <strong>ID: </strong>
              <div className="blue">{employeeDetails[0]}</div>
            </p>
            <p className="detail">
              <strong>Email: </strong>
              <div className="blue">{employeeDetails[2]}</div>
            </p>
          </div>
          <div>
            <p className="detail">
              <strong>Half Days Taken: </strong>
              <div className="blue">{employeeDetails[3]}</div>
            </p>
            <p className="detail">
              <strong>Salary Credited: </strong>
              <div className="blue">{employeeDetails[5]}</div>
            </p>
            <p className="detail">
              <strong>Leaves Taken In Month: </strong>
              <div className="blue">{employeeDetails[4]}</div>
            </p>
          </div>
        </div>

        <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong> Performance</strong>
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
          
          <div className="pmcontainer">
          <span style={{color: '#6075fe', marginRight: '5px'}} className="material-symbols-outlined">
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
                  className="inputShift"
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
}

export default PayrollTable;
