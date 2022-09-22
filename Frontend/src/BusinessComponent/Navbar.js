import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

  // const [title, setTitle] = useState('Dashboard');
  const userObj = useSelector(state=>state);

  let location = useLocation();
  let title;

  switch (location?.pathname) {
    case '/home/dashboard':
      title = 'Dashboard';
      break;
      case '/home/payroll':
      title = 'Payroll';
      break;
      case '/home/leave':
      title = 'Leave';
      break;
      case '/home/test':
      title = 'Quaterly Assessment';
      break;
      default:
      title = 'Dashboard'
      break;
  }

  return (
    <nav className="navbar">
      <div>{title}</div>
      <div
        style={{
          fontSize: "1.2rem",
          color: "#6075fe",
          fontWeight : '600',
          marginRight : '1rem'
        }}
      >
        {userObj?.firstName}
      </div>
    </nav>
  );
}

export default Navbar;