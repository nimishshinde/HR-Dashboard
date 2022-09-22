import React, { useState } from "react";
import "./EmployeeCalendar.css";
import { Calendar, Modal } from "antd";
import "antd/dist/antd.css";

function EmployeeCalendar() {
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const onSelect = () => {
    setVisible(true);
    modal.info(config);
  };

  const onCancel = () => {
    setVisible(false);
  };

  const config = {
    title: "On click date",
    content: (
      <>
        <div> Holaaa </div>
      </>
    ),
  };

  return (
    <>
      <div className="calendarmain">
        <Calendar
          fullscreen={false}
          style={{ width: "100%" }}
          //  value={value}
          onSelect={onSelect}
          //  onPanelChange={onPanelChange}
        />
      </div>
      {contextHolder}
    </>
  );
}

export default EmployeeCalendar;
