import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './AnimatedText.css'
import FontDrop_down from './FontDrop_down';

export default function AnimatedText() {

  const [state, setState]= useState("Animated Text");
  const [stay, setStay]= useState(false);
  const [speed, setSpeed] = useState(0.5)
  const [animationClass, setAnimationClass] = useState("text-pop-up-top")

    //let anName = "tracking-in-contract-bck-top"

function textInput(e){
setState(e.target.value);
console.log('state', state.split(" "));
}

//keeps the selected letter down
function stayDown(e){
  if (e.target.className.includes("animate-my-text")) {
    e.target.className = "animate-my-text stayDown"
    e.target.style.color = "#ffeb3b !important"
    setStay(true)
  } else {
    e.target.className = "animate-my-text"
    e.target.style.color = "#f8f8ff"
    setStay(false)
  }
}

function menuItem(e){
  setAnimationClass(e.target.textContent)
}

//Use styled-components package to access the ::before attribute
let Anime = styled.h1`
color: green,
&:hover {
  animation: none;
  transition: .3s;
  font-size: 50px
}`

//console.log(state.replaceAll(" ", "").split(""))

  return (
    <>
      <h2>Enter some text</h2>
      <div id="inputField">
                < input onInput={textInput} 
                  type="text" 
                  defaultChecked={state}   
                  className="inputs"
                  placeholder={state} 
                  id="x" />
            </div>
        <div className='animated_text'>
          
        {state.split(" ").map((item, index) => (
          <div className='index-container'>
             {item.split("").map((char,i) => 
              <Anime 
              onClick={stayDown}
              className={`animate-my-text ${animationClass}`}
              key={i}
              style={{
                'animationDuration': `${speed + i / 5}s`,
              }}>{char}
              </Anime>
             )}
          </div>
        ))}
      </div>
      <p>Remove animation effect from selected letters</p>
      <p>Choose transition</p>
      <FontDrop_down 
        title={animationClass}
        handleClick={menuItem}/>
    </>
  )
}
