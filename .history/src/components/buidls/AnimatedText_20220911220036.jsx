import React from 'react'

export default function AnimatedText() {

let letters = "AnimatedText"

  return (
    <div>
    {letters.split("").map((letter, index) =>(
     <h1>{letter}</h1>
     ))}
    </div>
  )
}
