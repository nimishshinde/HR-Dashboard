import React, { useEffect, useState } from "react";
import { Table, Radio, Space, Modal, Button, Dropdown, Menu } from "antd";
import axios from "axios";
import { DownOutlined } from "@ant-design/icons";

function PayrollTable({ clickedBtn }) {
  let Obj = [];

  const [mainData, setMainData] = useState(Obj);

  const [allrequest, setAllRequest] = useState([]);
  const [getValue, setGetValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({});

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
      url: `http://localhost:5000/admin/deparatment/${departmentName}`,
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
          obj.PayrollMangement?.salaryCreditedThisMonth == '' ? 'Not Credited' : `${obj.PayrollMangement?.salaryCreditedThisMonth}` ,
        ],
      ]);
    });
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

  const showModal = (record) => {
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
      dataIndex: '5',
      key: "key",
    },
  ];

  return (
    <div>
      <div>
        <Table
          style={{ padding: "5px" }}
          dataSource={mainData}
          columns={columns}
          align = {'center'}
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
              <strong>Email: </strong> <br />
              {employeeDetails.email}
            </p>
          </div>
          <div>
            <p>
              <strong>Half Days Taken:</strong> <br />
              {employeeDetails.address}
            </p>
            <p>
              <strong>Salary Credited:</strong> <br />
              {employeeDetails.performanceOfPerviousMonth}
            </p>
            <p>
              <strong>Leaves Taken In Month:</strong>
              <br /> {employeeDetails.leavesTakenInMonth}
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
}

export default PayrollTable;
