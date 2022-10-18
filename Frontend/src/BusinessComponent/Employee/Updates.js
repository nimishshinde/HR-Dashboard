import React, { useEffect, useState } from "react";
import EmployeeUpdatesCard from "../../SmallComponents/EmployeeUpdatesCard";
import { useSelector, useDispatch } from "react-redux";
import emptyimg from "../../assests/emptystateforupdates.png";
import axios from "axios";
import { BiTaskX } from "react-icons/bi";

import "./Updates.css";

function Updates() {
  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();
  const [updateArr, setUpdateArr] = useState([]);
  const [noData, setNoData] = useState(false);

  async function fetchUpdateObj() {
    let responseObj = await axios({
      method: "get",
      url: `https://hr-dashboard-nimish.herokuapp.com/employee/updates/${userObj.id}`,
    });

    console.log(responseObj.data);

    if (responseObj.data != null) {
      setUpdateArr(responseObj.data.taskCompletedArr);
    } else {
      setNoData(true);
    }
  }
  useEffect(() => {
    fetchUpdateObj();
  }, []);

  return (
    <div className="mainupdatectn">
      <div className="dailyupdatestxt"> Daily Updates </div>
      {updateArr.length != 0 ? (
        <div className="cardflexwrap" >
          {" "}
          {updateArr.map((el) => (
            // <div style={{ width:'30%' }} >
            // </div>
               <EmployeeUpdatesCard  data={ el } />
          ))}{" "}
        </div>
      ) : (
        <div>
          <div className="nodatatxt">
            {" "}
            No Updates <BiTaskX  size={20} color="#FF4646" />{" "}
          </div>
          <div className="imgctn">
            <img className="emptyimg" src={emptyimg}></img>
          </div>
        </div>
      )}
    </div>
  );
}

export default Updates;
