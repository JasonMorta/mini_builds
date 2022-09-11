import React from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

let letters = "Animate";
let speed = 5

  return (
    <div className='animated_text'>
    {letters.split("").map((letter, index) =>(
     <h1 
      className='text-pop-up-top'
      key={index}
      style={{'animationDuration': `0.${speed++}s`}}>{letter}</h1>
     ))}
    </div>
  )
}
