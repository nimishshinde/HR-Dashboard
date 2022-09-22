import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

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
    <nav className='navbar'>
    <div>
      {title}
    </div>
    <div>Admin</div>
    </nav>
  )
}

export default Navbar;