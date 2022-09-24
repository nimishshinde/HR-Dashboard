import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from "react-router-dom";
import {
  SIGNIN,
  ID,
  EMPTYP,
  DEP,
  FNAME,
  LNAME,
  EMAIL,
  PASSWORD,
  CPASSWORD,
  ADDRESS,
  PHONENO
} from "../redux/types";

import { Button, Form, Input, Select } from "antd";
import { motion } from "framer-motion";
import "./Signup.css";

const { Option } = Select;

const Signup = () => {
  const [highlight, setHighlight] = useState(false);
  const [form] = Form.useForm();

  const [ responseToNext, setResponseToNext ] = useState (false);

  const userObj = useSelector(state => state);
  const dispatch = useDispatch();
  console.log("From signUp useSelector", userObj);

  useEffect(()=>{
    dispatch({
      type: SIGNIN,
    });
  }, [])

  // useEffect(() => {}, [responseToNext]);
  
  const verifySignup = async (userDataObj) => {
    console.log(userDataObj, "<--- user Object ");
    
    let response = await axios({
      method: "post",
      url: "https://hr-dashboard-nimish.herokuapp.com/auth/signup",
      data: userObj,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });

    console.log("comming from Backend", response);

    dispatch({
      type : ID,
      id : response.data.id
    })

    if(response.status == 200){
      setResponseToNext(true);
    }
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
              dispatch({
                type: EMPTYP,
                employeeType: 1,
              });
            }}
            className={`${
              userObj.employeeType == 1 ? "btn btn-active" : "btn"
            }`}
          >
            Admin
          </div>
          <div
            onClick={() => {
              dispatch({
                type: EMPTYP,
                employeeType: 2,
              });
            }}
            className={`${
              userObj.employeeType == 1 ? "btn " : "btn btn-active"
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
                    required={true}
                    placeholder="First Name"
                    onChange={(e) => {
                      dispatch({ type: FNAME, firstName: e.target.value });
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
                    required={true}
                    placeholder="Last Name"
                    onChange={(e) => {
                      dispatch({ type: LNAME, lastName: e.target.value });
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
                required={true}
                placeholder="Email"
                onChange={(e) => {
                  dispatch({ type: EMAIL, email: e.target.value });
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
                required={true}
                placeholder="Password"
                onChange={(e) => {
                  dispatch({ type: PASSWORD, password: e.target.value });
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
                required={true}
                placeholder="Confirm Password"
                onChange={(e) => {
                  dispatch({
                    type: CPASSWORD,
                    confirmPassword: e.target.value,
                  });
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
                required={true}
                placeholder="Enter your department"
                onChange={(e) => {
                  dispatch({ type: DEP, deparatment: e.target.value });
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
                required={true}
                placeholder="Enter your address"
                onChange={(e) => {
                  dispatch({ type: ADDRESS, address: e.target.value });
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
                required={true}
                placeholder="Enter your Phone Number"
                onChange={(e) => {
                  dispatch({ type: PHONENO, phoneNumber: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item>
              <motion.div whileTap={{ scale: 1.05 }}>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    verifySignup(userObj);
                  }}
                >
                  <motion.div whileTap={{ scale: 1.1 }}>Sign up</motion.div>
                </Button>
                {responseToNext == true && (
                  <Navigate
                    to={
                      userObj.employeeType == 1
                        ? "/home/dashboard"
                        : "/home/employee/dashboard"
                    }
                  />
                )}
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
