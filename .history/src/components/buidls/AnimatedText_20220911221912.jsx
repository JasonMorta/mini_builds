import React from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

let letters = "AnimatedText"

  return (
    <div className='animated_text'>
    {letters.split("").map((letter, index) =>(
     <h1 className='text-pop-up-top' style={{'animationDuration': `${index+3}s`}}>{letter}</h1>
     ))}
    </div>
  )
}
