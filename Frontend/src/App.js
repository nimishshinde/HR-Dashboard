import React from "react";
import "./App.css";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Payroll from "./BusinessComponent/Payroll";
import Dashboard from "./BusinessComponent/Dashboard";
import Leave from "./BusinessComponent/Leave";
import Test from "./BusinessComponent/Test";

// import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="signup" element={<Signup />} />
        <Route exact path="home" element={<Home />}>
          <Route exact path="dashboard" element={<Dashboard />} />
          <Route exact path="employee/dashboard" element={<Dashboard />} />
          <Route exact path="payroll" element={<Payroll />} />
          <Route exact path="leave" element={<Leave />} />
          <Route exact path="test" element={<Test />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
