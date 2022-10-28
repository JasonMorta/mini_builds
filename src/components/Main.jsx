import React, { useState } from 'react';
import './Main.css';

export default function Main() {

const [heading, setHeading] = useState("Mini.Builds")

let header = heading.split("").map((char, idx) => (
  <h1 key={idx} style={{color: `#${Math.floor(Math.random()*16777215).toString(16)}`}}>{char}</h1>
))

  return (
    <div className='main_section'>
     {header}
     </div>
  )
}
