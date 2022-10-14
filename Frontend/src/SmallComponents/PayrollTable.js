import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Modal,
  Button,
  Dropdown,
  Menu,
  notification,
} from "antd";
import { GiPayMoney, GiTakeMyMoney } from "react-icons/gi";
import { MdOutlineAttachMoney } from "react-icons/md";
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

  const [salary, setSalary] = useState(0);
  const [currentEmpId, setCurretEmpId] = useState();

  const getDepartmentName = (clickedBtn) => {
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

  const openNotificationWithIcon = (type, mes, des) => {
    notification[type]({
      message: mes,
      description: des,
    });
  };

  const fetchRequest = async () => {
    setLoading(true);

    let departmentName = getDepartmentName(clickedBtn);
    let response = await axios({
      method: "get",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/deparatment/${departmentName}`,
    });
    console.log("from payroll table", response.data);
    setAllRequest(response.data);

    response.status == 200 && setLoading(false);

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

  async function updateSalary(salary) {
    let responseObj = await axios({
      method: "post",
      url: `https://hr-dashboard-nimish.herokuapp.com/admin/salary/${currentEmpId}`,
      data: {
        salary: salary,
      },
    });
    openNotificationWithIcon(
      "success",
      "User Salary Updated",
      ` Salary of Employee ${currentEmpId} is updated   `
    );
    handleCancel();
    setAllRequest([]);
  }

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 200);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const showModal = (record, rowIndex) => {
    setVisible(true);
    setEmployeeDetails(record);
    setCurretEmpId(record[0]);
    console.log(record[0]);
    console.log(record, "record after click");
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
          loading={loading}
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
        title="Employee Details"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="empdetailsmodel">
            <div onClick={() => updateSalary(salary)} className="updateBtn">
              {" "}
              Update{" "}
            </div>
          </div>,
        ]}
      >
        <div className="empDetails">
          <div>
            <p className="detail">
              <div>Name :</div> <div className="blue">{employeeDetails[1]}</div>
            </p>
            <p className="detail">
              <div>Employee Id : </div>
              <div className="blue">{employeeDetails[0]}</div>
            </p>
            <p className="detail">
              <div>Email : </div>
              <div className="blue">{employeeDetails[2]}</div>
            </p>
          </div>
          <div>
            <p className="detail">
              <div>Half Days Taken : </div>
              <div className="blue">{employeeDetails[3]}</div>
            </p>
            <p className="detail">
              <div>Salary Credited : </div>
              <div className="blue">{employeeDetails[5]}</div>
            </p>
            <p className="detail">
              <div>Leaves Taken In Month : </div>
              <div className="blue"> {employeeDetails[4]}</div>
            </p>
          </div>
        </div>

        {/* <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              insert_chart
            </span>
            <strong> Performance</strong>
          </div>

          <div className="econtainer">
            <div className="labelstyle">
              <label>Communication</label>
              <input
                style={{
                  borderRadius: "5px",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                  marginRight: "20%",
                }}
                type="number"
                placeholder="0 - 9"
              />
            </div>

            <div className="labelstyle">
              <label style={{ display: "flex" }}>Leadership</label>
              <input
                style={{
                  borderRadius: "5px",
                  marginRight: "20%",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                }}
                type="number"
                placeholder="0 - 9"
              />
            </div>

            <div className="labelstyle">
              <label> Helping </label>
              <input
                style={{
                  borderRadius: "5px",
                  marginRight: "20%",
                  border: "1px solid #A4A6B3",
                  outline: "none",
                  textAlign: "center",
                  padding: "0.4rem",
                }}
                type="number"
                placeholder="0 - 9"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              work_history
            </span>
            <strong>Select Shift Hours</strong>
          </div>

          <div className="econtainer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                aligItem: "center",
                width: "100%",
              }}
            >
              <Dropdown overlay={menu}>
                <Space style={{ fontSize: "1rem" }}>
                  Select shift hours
                  <DownOutlined />
                </Space>
              </Dropdown>
              <input
                className="inputShift"
                readOnly
                type="text"
                value={getValue}
              />
            </div>
          </div>
        </div> */}

        <div>
          <div className="pmcontainer">
            <span className="material-symbols-outlined performanceIcon">
              {/* work_history */}
              <GiPayMoney />
              {/* <GiTakeMyMoney />
            <MdOutlineAttachMoney /> */}
            </span>
            <strong> Update Salary </strong>
          </div>
          <div className="econtainer">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                aligItem: "center",
                width: "100%",
                marginTop: "0.4rem",
              }}
            >
              <span
                style={{
                  fontSize: "1.2rem",
                  marginTop: "0.3rem",
                  // color: "#A4A6B3",
                  fontWeight: "400",
                }}
              >
                Enter in Lakhs
              </span>
              <input
                placeholder="  "
                className="inputShift"
                type="number"
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PayrollTable;
