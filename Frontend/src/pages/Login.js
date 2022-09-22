import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

import { Form, Input, Button } from "antd";
import "./Login.css";
import { motion } from "framer-motion";

const Login = () => {
  const [form] = Form.useForm();
  const [userEmail, setUseremail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [highlight, setHighlight] = useState(false);

  const [responseToNext, setResponseToNext] = useState(false);

  const userObj = useSelector((state) => state);
  const dispatch = useDispatch();

  const verifyLogin = async (userEmail, userPassword) => {
    console.log(userEmail, userPassword, "fromFrontEnd");
    userData.email = userEmail;
    userData.password = userPassword;
    setUserData(userData);
    console.log(userData, "fromfrontend");

    try {
      let response = await axios({
        method: "post",
        url: "http://localhost:5000/auth/login",
        data: userData,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      })
        .then((res) => {
          if (res.status == 200) {

            if (res.data?.errorMessage?.length == 0 || res.data?.errorMessage?.length == undefined ) setResponseToNext(true);
            dispatch({
              type: "login",
              payload: res.data,
            });
            console.log(res, "from line no 46 response");
          }
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      console.log("error while logging in ", error);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <div className="cont1">
          <p
            onMouseOver={() => {
              setHighlight(true);
            }}
            onMouseOut={() => {
              setHighlight(false);
            }}
            style={{ cursor: "default" }}
            className={`${highlight ? "log highlight" : "log"}`}
          >
            Log In
          </p>
        </div>
        <div className="cont2">
          <Form form={form} layout="vertical">
            <Form.Item>
              <label className="label" style={{ fontSize: "1rem" }}>
                Email
              </label>
              <Input
                style={{ marginTop: "0.6rem" }}
                type="email"
                placeholder="Email address"
                name="email"
                onChange={(e) => setUseremail(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              {" "}
              <div className="label password ">
                <label>Password</label>
                <Link to="/">
                  <motion.div
                    style={{ fontSize: "0.8rem" }}
                    whileHover={{ scale: 1.1 }}
                  >
                    Forgot password?
                  </motion.div>
                </Link>
              </div>
              <Input
                style={{ marginTop: "0.6rem" }}
                type="password"
                placeholder="password"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              {responseToNext == true && (
                <Navigate
                  to={
                    userObj.employeeType == 1
                      ? "/home/dashboard"
                      : "/home/employee/dashboard"
                  }
                />
              )}
              <Button
                onClick={() => verifyLogin(userEmail, userPassword)}
                className="login-button"
                style={{ backgroundColor: "#0284c7", color: "white" }}
              >
                <motion.div whileTap={{ scale: 1.1 }}>Log In</motion.div>
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="account">
          <p>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
