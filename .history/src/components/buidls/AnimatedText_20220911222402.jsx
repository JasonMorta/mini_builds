import React from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

let letters = "Animate";
let speed = 1

  return (
    <div className='animated_text'>
    {letters.split("").map((letter, index) =>(
     <h1 
      className='text-pop-up-top'
      key={index}
      style={{'animationDuration': `${speed++ - 0.5}s`}}>{letter}</h1>
     ))}
    </div>
  )
}
