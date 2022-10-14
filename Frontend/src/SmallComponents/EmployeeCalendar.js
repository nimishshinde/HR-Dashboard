import React, { useState, useRef } from "react";
import "./EmployeeCalendar.css";
import { Calendar, Modal } from "antd";
import "antd/dist/antd.css";

function EmployeeCalendar() {
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const dateRef = useRef('');

  const onSelect = (datefromCalendar) => {
    dateRef.current = datefromCalendar;
    alert(dateRef)
    setVisible(true);
    modal.info(config);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const config = {
    title: `Schedules for ${ dateRef.current }`,
    content: (
      <>
        <div> No Updates for now { dateRef.current }</div>
      </>
    ),
  };

  return (
    <>
      <div className="calendarmain">
        <Calendar
          fullscreen={false}
          style={{ width: "100%" }}
          onSelect={(date)=>onSelect(date)}
        />
      </div>
      {contextHolder}
    </>
  );
}

export default EmployeeCalendar;
