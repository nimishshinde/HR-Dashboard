import React from 'react'
import "./Section.css";

function Section({text, img}) {
  return (
    <div className='mainSection' >
        <div> { text } </div>
    </div>
  )
}

export default Section