import React from 'react';
import { useState } from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

  const [state, setState]= useState("Animated Text")

let speed = 0.5;

function textInput(e){
setState(e.target.value)
}

//console.log(state.replaceAll(" ", "").split(""))

  return (
    <>
    <p>Enter some text</p>
     <div id="inputField">
              < input onInput={textInput} 
                type="text" 
                defaultChecked={state}   
                className="inputs"
                placeholder={state} 
                id="x" />
          </div>
      <div className='animated_text'>
         
      {state.split("").map((item, index) =>(
       <h1 
        className='text-pop-up-top'
        key={index}
        style={{'animationDuration': `${speed}s`}}>{item}</h1>
       ))}
      </div>
    </>
  )
}
