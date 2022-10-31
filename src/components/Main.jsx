import React, { useState } from 'react';
import './Main.css';
import './builds/Loaders/sliderAnimations.css'

export default function Main() {

const [heading, setHeading] = useState("Mini.Builds")

let header = heading.split("").map((char, idx) => (
  <h1 
    key={idx}
    className={idx % 2 === 0 ? "slide-in-tr " : "slide-in-tl "}
    style={{
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      animationDelay:` 0.${idx}s`

      
      }}>
      {char}
    </h1>
))

  return (
    <div className='main_section'>
     {header}
     </div>
  )
}
