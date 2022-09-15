import React, { useState } from "react";
// import "antd/dist/antd.css";
import { Button, Form, Input, Select } from "antd";
import "./Signup.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// import { useDataLayerValue } from "../DataLayer/DataLayer";
import axios from "axios";

const { Option } = Select;

const Signup = () => {
  const [highlight, setHighlight] = useState(false);
  const [form] = Form.useForm();
  // const [signupData, dispatch] = useDataLayerValue();

  const verifySignup = async (userDataObj) => {
    console.log(userDataObj, "user Object ");
    let response = await axios({
      method: "post",
      url: "http://localhost:5000/auth/signup",
      data: signupData,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    // let res = await axios.post(`http://localhost:5000/auth/signup`, signupData);
    console.log("comming from Backend", response);
  };

  return (
    <div className="login">
      <div className="container signupcont">
        <div className="cont1">
          <p
            onMouseOver={() => {
              setHighlight(true);
            }}
            onMouseOut={() => {
              setHighlight(false);
            }}
            className={`${highlight ? "log highlight" : "log"}`}
            style={{
              marginBottom: "0.6rem",
              marginTop: "0.6rem",
              cursor: "default",
            }}
          >
            Sign up
          </p>
        </div>
        <div className="btnContainer">
          <div
            onClick={() => {
              // dispatch({ type: "type", value: 1 });
            }}
            className={`${
              signupData.employeeType == 1 ? "btn btn-active" : "btn"
            }`}
          >
            Admin
          </div>
          <div
            onClick={() => {
              // dispatch({ type: "type", value: 2 });
            }}
            className={`${
              signupData.employeeType == 2 ? "btn " : "btn btn-active"
            }`}
          >
            Employee
          </div>
        </div>
        <div className="content">
          <Form
            form={form}
            layout="vertical"
            name="register"
            scrollToFirstError
          >
            <div className="names">
              <div style={{ width: "50%" }}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please select first name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your First Name"
                    onChange={(e) => {
                      // dispatch({ type: "firstName", value: e.target.value });
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please select last name!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Enter your Last Name"
                    onChange={(e) => {
                      // dispatch({ type: "lastName", value: e.target.value });
                    }}
                  />
                </Form.Item>
              </div>
            </div>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input
                placeholder="Enter you Email"
                onChange={(e) => {
                  // dispatch({ type: "email", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Enter your Password"
                onChange={(e) => {
                  // dispatch({ type: "password", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                onChange={(e) => {
                  // dispatch({ type: "confirm", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  required: true,
                  message: "Please add your department!",
                },
              ]}
            >
              <Input
                placeholder="Enter your department"
                onChange={(e) => {
                  // dispatch({ type: "department", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="Address"
              rules={[
                {
                  required: true,
                  message: "Please select address!",
                },
              ]}
            >
              <Input
                placeholder="Enter your address"
                onChange={(e) => {
                  // dispatch({ type: "address", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: "Please select phone number!",
                },
              ]}
            >
              <Input
                placeholder="Enter your Phone Number"
                onChange={(e) => {
                  // dispatch({ type: "phone", value: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item>
              <motion.div whileTap={{ scale: 1.05 }}>
                <Link
                  to={
                    signupData.employeeType == 1
                      ? "/home/dashboard"
                      : "/home/employee/dashboard"
                  }
                >
                  <Button
                    style={{ width: "100%" }}
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      verifySignup(signupData);
                    }}
                  >
                    <motion.div whileTap={{ scale: 1.1 }}>Sign up</motion.div>
                  </Button>
                </Link>
              </motion.div>
            </Form.Item>
          </Form>

          <p style={{ textAlign: "center" }}>
            Already have an account?{" "}
            <Link to={"/"} className="signup">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
