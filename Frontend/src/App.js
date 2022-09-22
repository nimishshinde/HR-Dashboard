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
import Chat from "./BusinessComponent/Chat";
// import DashboardTable from './BusinessComponent/DashboardTable';
// import PreDashTable from "./BusinessComponent/Employee/PreDashTable";
import DashboardTableOne from "./SmallComponents/DashboardTableOne";
import { Provider } from "react-redux";
import store from "./redux/store";

// import "antd/dist/antd.css";

function App() {
  
  return (
    <>
      <Provider store={store}>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="signup" element={<Signup />} />
            <Route exact path="home" element={<Home />}>
              <Route exact path="employee/dashboard" element={<Dashboard />} />
              <Route exact path="dashboard" element={<Dashboard />}/>
              <Route exact path="payroll" element={<Payroll />} />
              <Route exact path="leave" element={<Leave />} />
              <Route exact path="test" element={<Test />} />
            </Route>
          </Routes>
        </div>
      </Provider>
    </>
  );
}

export default App;
