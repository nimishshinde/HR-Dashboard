import React, { useState } from "react";
import "antd/dist/antd.min.css";
import { Button, Form, Input, Select } from "antd";
import "./Signup.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const { Option } = Select;

const Signup = () => {

  const [btnactive, setBtnActive] = useState(false);
  const [highlight, setHighlight] = useState(false);

  const [form] = Form.useForm();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    phone: "",
    type: "",
    department: '',
  });

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userType, setUserType] = useState(1);
  const [userDepartment, setUserDepartment] = useState("");

  const verifySignup = async (
    userFirstName,
    userLastName,
    userEmail,
    userPassword,
    confirmPassword,
    userAddress,
    userPhone,
    userType,
    userDepartment,
  ) => {
    console.log(
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      confirmPassword,
      userAddress,
      userPhone,
      userType,
      userDepartment,
      "fromfrontendsignup"
    );
    userData.firstName = userFirstName;
    userData.lastName = userLastName;
    userData.email = userEmail;
    userData.password = userPassword;
    userData.confirm = confirmPassword;
    userData.address = userAddress;
    userData.phone = userPhone;
    userData.type = userType;
    userData.department = userDepartment;
    setUserData(userData);
    console.log(userData, "fromfrontendsignup");
    let response = await axios({
      method: "post",
      url: "http://localhost:5000/auth/signup",
      data: userData,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    console.log(response);
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
              setUserType(1);
              setBtnActive(!btnactive);
            }}
            className={`${btnactive ? "btn btn-active" : "btn"}`}
          >
            Admin
          </div>
          <div
            onClick={() => {
              setUserType(2);
              setBtnActive(!btnactive);
            }}
            className={`${btnactive ? "btn " : "btn btn-active"}`}
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
                    onChange={(e) => setUserFirstName(e.target.value)}
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
                    onChange={(e) => setUserLastName(e.target.value)}
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
                onChange={(e) => setUserEmail(e.target.value)}
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
                onChange={(e) => setUserPassword(e.target.value)}
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
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                onChange={(e) => setUserDepartment(e.target.value)}
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
                onChange={(e) => setUserAddress(e.target.value)}
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
                onChange={(e) => setUserPhone(e.target.value)}
              />
            </Form.Item>

            <Form.Item>
              <motion.div whileTap={{ scale: 1.05 }}>
                <Link to={'/home/dashboard'}><Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    verifySignup(
                      userFirstName,
                      userLastName,
                      userEmail,
                      userPassword,
                      confirmPassword,
                      userAddress,
                      userPhone,
                      userType,
                      userDepartment,
                    );
                  }}
                >
                  <motion.div whileTap={{ scale: 1.1 }}>Sign up</motion.div>
                </Button></Link>
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
