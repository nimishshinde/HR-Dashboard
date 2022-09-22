import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import moment from "moment";
import {
  ExclamationOutlined,
  FileExclamationOutlined,
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import "./EmployeePreviousLeave.css";
import { IoMdReturnRight, IoMdReturnLeft } from "react-icons/io";
import { Modal } from "antd";

function EmployeePreviousLeave({ pendingObj }) {
  console.log(pendingObj, "from leave testing in previousleaves");
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [idx, setIdx] = useState(0);

  const userObj = useSelector((state) => state);
  console.log(userObj, 'from selector of empprelev', userObj.id)
  const dispatch = useDispatch();

  console.log(
    Object.keys(pendingObj).length == 0,
    "from employee previous Leave"
  );

  useEffect(() => {
    (async () => {
      try {
        let response = await axios({
          method: "get",
          url: `http://localhost:5000/admin/leave/${userObj.id}`,
        });

        setData(response.data);
        console.log(response.data, 'useEffect empprelev');
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const setDataOfModal = (idx) => {
    console.log(idx);
    console.log(data[idx], "after clicking on the previous leaves");
    setIdx(idx);
    showModal();
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <div className="pendingLeavesMain">
        {data?.length == 0 ? (
          <div className="pendingtxt pendingLeave ">
            {" "}
            No Pending Leave Request{" "}
          </div>
        ) : (
          <>
            <span className="pendingtxt">Pending Leave Section</span>
            {data?.map((dataObj, index) => (
              <>
                {dataObj.isPending == true && (
                  <>
                    <div
                      style={{
                        marginTop: "0.4rem",
                        width: "100%",
                      }}
                    >
                      <div
                        className="pendingLeave"
                        onClick={() => setDataOfModal(index)}
                      >
                        <div
                          className="pendingCard"
                          style={{ marginTop: "1rem" }}
                        >
                          <div className="">
                            <div className="datesDisplay">
                              <IoMdReturnRight
                                fontSize="1.5rem"
                                color="#6075fe"
                              />{" "}
                              {moment(dataObj.dateOfLeave).format(
                                "DD MMM YYYY"
                              )}{" "}
                            </div>

                            <div className="datesDisplay">
                              {moment(dataObj.endOfLeave).format("DD MMM YYYY")}{" "}
                              <IoMdReturnLeft
                                fontSize="1.5rem"
                                color="#7bd4fb"
                              />
                            </div>
                          </div>

                          <div style={{ fontSize: "1.2rem" }}>
                            {"Days : "}
                            <span
                              className="datespan"
                              style={{ fontSize: "1.3rem" }}
                            >
                              {" "}
                              {dataObj.noofDaysLeaveRequired}{" "}
                            </span>
                          </div>

                          <div className="statusctn">Pending</div>

                          <div className="iconctnstyle">
                            <MoreOutlined className="iconstyle more" />
                            <EditOutlined className="iconstyle edit" />
                            <DeleteOutlined className="iconstyle delete" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            ))}
          </>
        )}
      </div>

      <div style={{ margin: "1rem" }}>
        <span className="pendingtxt" style={{ marginLeft: "10px" }}>
          {" "}
          Previous Leaves{" "}
        </span>{" "}
        {data.length != 0 ? (
          <>
            {data.map((levObj, index) => (
              <>
                <div
                  className="prevlevmain"
                  onClick={() => setDataOfModal(index)}
                >
                  <div>
                    From :{" "}
                    <span className="datespan">
                      {" "}
                      {moment(levObj.dateOfLeave).format("DD MMM YYYY")}{" "}
                    </span>
                    To :
                    <span className="datespan">
                      {moment(levObj.endOfLeave).format("DD MMM YYYY")}{" "}
                    </span>
                    that is for :{" "}
                    <span className="datespan">
                      {" "}
                      {levObj.noofDaysLeaveRequired} days
                    </span>
                    <div>
                      {" "}
                      Subject :{" "}
                      <span className="datespan">
                        {levObj.reasonOfLeave.length > 30
                          ? levObj.reasonOfLeave.slice(0, 30) + "..."
                          : levObj.reasonOfLeave}{" "}
                      </span>{" "}
                    </div>
                  </div>

                  <div className="anstxt">
                    {/* Your Request is{" "} */}
                    {levObj.isRejected == false &&
                    levObj.isApproved == false ? (
                      <span> No Result </span>
                    ) : levObj.isRejected == true ? (
                      <span className="rejecttxt">Rejected</span>
                    ) : (
                      <span className="approvetxt">Approved</span>
                    )}
                  </div>
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="flexcls">
            {" "}
            <FileExclamationOutlined
              style={{
                fontSize: "3rem",
                color: "#FF4646",
                marginRight: "0.4rem",
              }}
            />
            No Previous Leave Applied <ExclamationOutlined />
          </div>
        )}
      </div>

      <Modal
        visible={visible}
        title={
          <div>
            {" "}
            Leave Information{" "}
            <span>
              {" "}
              {
                // (data[idx]?.isApproved == false && data[idx]?.isRejected == false && data[idx]?.isPending == true ) ?  (null) : (null)
                data[idx]?.isPending == true ? (
                  <span
                    style={{
                      color: "#5FD068",
                      marginLeft: "30%",
                      fontSize: "0.8rem",
                    }}
                  >
                    Pending
                  </span>
                ) : data[idx]?.isApproved == true ? (
                  <span
                    style={{
                      color: "#6075fe",
                      marginLeft: "30%",
                      fontSize: "0.8rem",
                    }}
                  >
                    {" "}
                    Approved{" "}
                  </span>
                ) : (
                  <>
                    {data[idx]?.isRejected == true && (
                      <span
                        style={{
                          color: "#FF4646",
                          marginLeft: "30%",
                          fontSize: "0.8rem",
                        }}
                      >
                        {" "}
                        Rejected{" "}
                      </span>
                    )}
                  </>
                )
              }{" "}
            </span>{" "}
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          top: 20,
        }}
        footer={[
          <div className="disfec" onClick={handleOk}>
            {" "}
            <div className="divbtn fontw600 "> Okay </div>{" "}
          </div>,
        ]}
      >
        <div className="disfac" style={{ marginBottom: "6%" }}>
          <div className="  fontw600 font1">
            {moment(data[idx]?.dateOfLeave).format("DD MMM YYYY")}
          </div>

          <div>
            <SwapOutlined className="icon maicol" />
          </div>

          <div className=" fontw600 font1">
            {moment(data[idx]?.endOfLeave).format("DD MMM YYYY")}
          </div>
        </div>

        <div>
          <div className="disfac">
            <div className="  fontw600 font1">
              Id : <span className="maicol">{data[idx]?.leaveId}</span>
            </div>
          </div>

          <div className="disfac">
            <div className="fontw600 font1  ">
              Subject :
              <span className="maicol" style={{ wordBreak: "break-word" }}>
                {" "}
                {data[idx]?.reasonOfLeave}
              </span>
            </div>
          </div>

          <div className="disfac">
            <div className=" fontw600 font1">
              Remaining Leaves :{" "}
              <span className="datespan"> {data[idx]?.remainingLeaves} </span>
            </div>
            <div className=" fontw600 font1">
              Leaves This Month :{" "}
              <span className="datespan">
                {" "}
                {data[idx]?.leavesTakenInMonth}{" "}
              </span>
            </div>
          </div>

          {data[idx]?.reasonOfRejection?.length > 0 ? (
            <div className="disfac">
              <div className="fontw600 font1">
                Rejection Message : <span>{data[idx]?.reasonOfRejection} </span>
              </div>
            </div>
          ) : null}
        </div>
      </Modal>
    </div>
  );
}

export default EmployeePreviousLeave;

/*

dateOfLeave
: 
"08 Sep 2022"
deparatment
: 
"TestDeparatment"
designation
: 
"TestDesignation"
employeId
: 
""
employeName
: 
"Test"
endOfLeave
: 
"24 Sep 2022"
isApproved
: 
false
isPending
: 
true
isRejected
: 
false
leavesTakenInMonth
: 
3
noofDaysLeaveRequired
: 
16
reasonOfLeave
: 
"TestNumber"
remainingLeaves
: 
""

*/
