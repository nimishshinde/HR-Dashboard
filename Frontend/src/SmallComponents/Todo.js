import Input from "antd/lib/input/Input";
import React, { useState, useEffect } from "react";
import "./Todo.css";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./TodoCard";
import { DatePicker, notification } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { AlertOutlined } from "@ant-design/icons";
import { TiTick } from "react-icons/ti";

const Todo = () => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const [enterTodoDetails, setEnterTodoDetails] = useState("");
  const [storeAllTodo, setStoreAllTodo] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const [updateActive, setUpdateActive] = useState(false);
  const [storeSingleTodo, setStoreSingleTodo] = useState({});

  const handleAddTodo = () => {
    if (dueDate !== "" && enterTodoDetails !== "" && todoDescription !== "") {
      setStoreAllTodo([
        ...storeAllTodo,
        {
          id: uuidv4(),
          title: enterTodoDetails,
          date: dueDate,
          description: todoDescription,
        },
      ]);
      notification.open({
        message: "Message",
        description: "Your tasks are saved",
        icon: (
          <TiTick
            style={{
              color: "#4BB543",
            }}
          />
        ),
      });
      setDueDate("");
      setTodoDescription("");
      setEnterTodoDetails("");
    } else {
      notification.open({
        message: "Alert",
        description: "Please enter all the fields",
        icon: (
          <AlertOutlined
            style={{
              color: "red",
            }}
          />
        ),
      });
    }
  };

  const handleDate = (date) => {
    const dates = moment(date).format("D MM YYYY");
    setDueDate(dates);
  };

  const handleDescription = (e) => {
    setTodoDescription(e.target.value);
  };

  const handleDelete = (id) => {
    setStoreAllTodo((oldItems) => {
      return oldItems.filter((todo) => {
        return todo.id !== id;
      });
    });
    notification.open({
      message: "Alert",
      description: "Todo Deleted",
      icon: (
        <AlertOutlined
          style={{
            color: "red",
          }}
        />
      ),
    });
  };

  const handleEdit = (todo) => {
    setEnterTodoDetails(todo.title);
    setTodoDescription(todo.description);
    setDueDate(todo.date);
    setUpdateActive(true);
    setStoreSingleTodo(todo);
  };

  
  const handleUpdateTodo = () => {
    const copyUpdatedTodoList = storeAllTodo.map((todo) => {
      if (todo.id === storeSingleTodo.id) {
        
        todo.title = enterTodoDetails;
        todo.date = dueDate;
        todo.description = todoDescription;
        return todo;
      }
      return todo;
    });

    if (enterTodoDetails !== "" && dueDate !== "" && todoDescription !== "") {
      setStoreAllTodo(copyUpdatedTodoList);
      console.log(dueDate, "FROM DUE DATE");
      setUpdateActive(!updateActive);
      notification.open({
        message: "Message",
        description: "Your task is updated",
        icon: (
          <TiTick
            style={{
              color: "#4BB543",
            }}
          />
        ),
      });
      setEnterTodoDetails("");
      setTodoDescription("");
    } else {
      notification.open({
        message: "Alert",
        description: "Please enter all the fields",
        icon: (
          <AlertOutlined
            style={{
              color: "red",
            }}
          />
        ),
      });
    }
  };

  // --------------------------------------------------------------------------------

  return (
    // <div className="mainTodoContainer">
    //   <div className="tasksContainer">
    //     <div
    //       style={{
    //         color: "rgb(123, 212, 251)",
    //         fontSize: "1.2rem",
    //         marginTop: "1rem",
    //       }}
    //     >
    //       Save your Task
    //     </div>
    //     <div className="tasksAssigned">
    //       <div>
    //         {" "}
    //         Title :{" "}
    //         <Input
    //           style={{ width: "16rem" }}
    //           value={enterTodoDetails}
    //           onChange={(e) => {
    //             setEnterTodoDetails(e.target.value);
    //           }}
    //           type="text"
    //           placeholder="Keep it short"
    //           className="todoInput"
    //         />
    //       </div>
    //     </div>
    //     <div>
    //       <div className="date">
    //         Due Date :{" "}
    //         <DatePicker
    //           onSelect={(date) => handleDate(date)}
    //           format={dateFormatList}
    //         />
    //       </div>
    //       <TextArea
    //         style={{ minHeight: "5.5rem" }}
    //         onChange={handleDescription}
    //         placeholder="Enter the task description"
    //         name="todo description"
    //         id=""
    //         cols="30"
    //         rows="3"
    //         value={todoDescription}
    //       />
    //     </div>
    //     <button onClick={handleAddTodo} className="addButton">
    //       Add
    //     </button>
    //   </div>
    //   <div className="todos">
    //     <ol>
    //       {storeAllTodo.map((todo) => {
    //         return <TodoCard todo={todo} />;
    //       })}
    //     </ol>
    //   </div>
    // </div>
    <>
      <div className="empupdates">
        <div className="updatetxts">
          <div className="sendbtnctns"> Add Todo's </div>

          <div className="empflex">
            Todo Name{" "}
            <span>
              <Input
                value={enterTodoDetails}
                placeholder="Keep it short"
                style={{ width: "16rem" }}
                onChange={(e) => setEnterTodoDetails(e.target.value)}
              />
            </span>
          </div>
          <div className="empflex">
            Due Date
            <span>
              <DatePicker
                style={{ width: "16rem" }}
                onSelect={(date) => handleDate(date)}
              />
            </span>
          </div>
          <div className="empflex">
            {" "}
            Description
            <TextArea
              style={{ width: "16rem" }}
              placeholder="Description of the todo"
              autoSize={{
                minRows: 3,
                maxRows: 6,
              }}
              onChange={(e) => handleDescription(e)}
              value={todoDescription}
            />
          </div>

          {!updateActive ? (
            <div className="sendbtnctn">
              <div onClick={handleAddTodo} className="sendbtn">
                {" "}
                Add{" "}
              </div>
            </div>
          ) : (
            <div className="sendbtnctn">
              <div onClick={handleUpdateTodo} className="sendbtn">
                {" "}
                Update{" "}
              </div>
            </div>
          )}
        </div>
        <div className="todoCardsContainer">
          {storeAllTodo.map((todo) => {
            return (
              <TodoCard
                key={todo.id}
                id={todo.id}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleUpdateTodo={handleUpdateTodo}
                todo={todo}
                updateActive={updateActive}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
