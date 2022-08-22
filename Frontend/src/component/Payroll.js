import React, { useState } from 'react';
import Section from './Section';
import "./Payroll.css";


const Payroll = () => {
  const [clickStyle, setClickStyle] = useState(1);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", flexWrap: "wrap" }}>
        <div className={` ${clickStyle == 1 ? "activeSection sections" : "sections"}`} onClick={() => setClickStyle(1)} >Engineering</div>
        <div className={` ${clickStyle == 2 ? "activeSection sections" : "sections"}`} onClick={() => setClickStyle(2)} >Operations</div>
        <div className={` ${clickStyle == 3 ? "activeSection sections" : "sections"}`} onClick={() => setClickStyle(3)} >Accounts</div>
        <div className={` ${clickStyle == 4 ? "activeSection sections" : "sections"}`} onClick={() => setClickStyle(4)} >Supply Chain</div>
      </div>
    </div>
  )
}

export default Payroll;