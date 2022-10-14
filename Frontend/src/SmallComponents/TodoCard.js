import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import "./TodoCard.css";
import { motion } from "framer-motion";

const TodoCard = ({ todo, handleDelete, id, handleEdit, updateActive, handleUpdateTodo}) => {
  
const [updateBtn, setUpdateBtn] = useState(updateActive);

console.log(updateBtn, "UPDATE BTN");
console.log(updateActive, "updateActive BTN");

// useEffect(() => {
//   setUpdateBtn(updateActive);
// }, [updateActive])

  return (
    <div className="singleTodoMainContainer">
      <div className="singleTodo">
        <div className="titleDate">
          <div>Title: {todo.title} </div>
          <div style={{ marginRight: "10%" }}> Due date: {todo.date}</div>
        </div>
        <div>{todo.description}</div>
      </div>

      <div className="todoButtons">
        <>
            <motion.div
              whileHover={{ color: "red", scale: 1.1 }}
              onClick={() => handleDelete(id)}
            >
              <DeleteOutlined style={{ fontSize: "20px" }} />
            </motion.div>

            <motion.div
              whileHover={{ color: "#22c55e", scale: 1.1 }}
              onClick={() =>{ handleEdit(todo); setUpdateBtn(true) }}
            >
            <EditOutlined  style={{ fontSize: "20px", marginLeft: "15px" }} />
            </motion.div> 

            {/* {updateBtn === false ? (<> <motion.div
              whileHover={{ color: "#22c55e", scale: 1.1 }}
              onClick={() =>{ handleEdit(todo); setUpdateBtn(true) }}
            >
            <EditOutlined  style={{ fontSize: "20px", marginLeft: "15px" }} />
            </motion.div> </>) : (<>

            <motion.div whileHover={{ color: "#22c55e", scale: 1.1 }} style={{ marginLeft: "10px" }}>
              <span onClick={() => {handleUpdateTodo(); setUpdateBtn(false)}} class="material-symbols-outlined">upgrade</span>
            </motion.div></>)} */}
              
            
          </>
      </div>
    </div>
  );
};

export default TodoCard;
