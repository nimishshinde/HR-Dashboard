import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {

  // const [title, setTitle] = useState('Dashboard');

  let location = useLocation();
  let title;

  switch (location?.pathname) {
    case '/home/dashboard':
      // setTitle('Dashboard');
      title = 'Dashboard';
      break;
      case '/home/payroll':
      // setTitle('Payroll');
      title = 'Payroll';
      break;
      case '/home/leave':
      // setTitle('Leave');
      title = 'Leave';
      break;
      case '/home/test':
      // setTitle('Quaterly Assessment');
      title = 'Quaterly Assessment';
      break;
      default:
      // setTitle('Dashboard');
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