import React from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

let letters = "AnimatedText"

  return (
    <div className='animated_text'>
    {letters.split("").map((letter, index) =>(
     <h1>{letter}</h1>
     ))}
    </div>
  )
}
