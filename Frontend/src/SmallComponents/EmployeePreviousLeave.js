import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import "./EmployeePreviousLeave.css";
import { IoMdReturnRight, IoMdReturnLeft } from "react-icons/io";

function EmployeePreviousLeave({ pendingObj }) {
  console.log(
    Object.keys(pendingObj).length == 0,
    "from employee previous Leave"
  );

  const [data, setData] = useState([]);
  // setData(prev=> [...prev, pendingObj])

  useEffect(()=>{
    (async ()=>{
      try {

      let response = await axios({
        method: "get",
        url: `http://localhost:5000/admin/leave/8`,
      });



      console.log(response.data);

    } catch (error) {
      console.log(error);
    }
    })()
}, []);

  return (
    <div>
      <div className="pendingLeave">
        {Object.keys(pendingObj).length == 0 ? (
          <div className="pendingtxt"> No Pending Leave Request </div>
        ) : (
          <div>
            Actions Pending 
            <div className="">
              <div className="datesDisplay">
                <IoMdReturnRight fontSize="1.5rem" color="#6075fe" />{" "}
                {moment(pendingObj.dateOfLeave).format("DD MMM YYYY")}{" "}
              </div>

              <div className="datesDisplay">
                {moment(pendingObj.endOfLeave).format("DD MMM YYYY")}{" "}
                <IoMdReturnLeft fontSize="1.5rem" color="#7bd4fb" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div>
        Pending Leave Request
        <div>this section will have previous leaves of the Employee</div>
      </div>
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
