import React from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

let letters = "AnimatedText"

  return (
    <div className='animated_text'>
    {letters.split("").map((letter, index) =>(
     <h1 className='text-pop-up-top' style={{'animation': `0.${index}s`}}>{letter}</h1>
     ))}
    </div>
  )
}
