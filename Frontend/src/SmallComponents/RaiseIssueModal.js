import React from "react";
import { Modal, Input, notification } from "antd";
import { TiTick } from "react-icons/ti";

const { TextArea } = Input;

function RaiseIssueModal({ raiseIssueModal, setRaiseIssueModal }) {
  const handleIssue = (text) => {

  };

  const handleOk = () => {
    setRaiseIssueModal(false);
  };

  const handleCancel = () => {
    setRaiseIssueModal(false);
  };

  const handleUpdate = () => {
    setTimeout(() => {
      setRaiseIssueModal(false);
      notification.open({
        message: "Your Issue has been sent to the Admin!",
        icon: <TiTick style={{ fontSize: "1.5rem", color: "#4BB543" }} />,
      });
    }, 200);
  };

  return (
    <>
      <Modal
        title="This message will be sent to the admin"
        visible={raiseIssueModal}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <div className="footerctn" onClick={handleUpdate}>
            {" "}
            <div className="footerbtn"> Send </div>{" "}
          </div>,
        ]}
      >
        <TextArea
          rows={5}
          placeholder="Please write down the Issue"
          maxLength={300}
          onChange={(e) => handleIssue(e.target.value)}
          minLength={60}
        />
      </Modal>
    </>
  );
}

export default RaiseIssueModal;
