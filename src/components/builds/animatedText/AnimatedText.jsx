import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import './AnimatedText.css'
import FontDrop_down from './FontDrop_down';

export default function AnimatedText() {

  const [state, setState]= useState("Animated Text");
  const [stay, setStay]= useState(false);
  const [animationName, setAnimationName] = useState("text-pop-up-top")

  let anName = "text-pop-up-top"
let speed = 0.5;

function textInput(e){
setState(e.target.value);
console.log('state', state.split(" "));
}

//keeps the selected letter down
function stayDown(e){
  
  if (e.target.className === "animate-my-text") {
      e.target.className = "animate-my-text stayDown"
      setStay(true)
      e.target.style.color = "hotpink"
      } else {
        e.target.className = "animate-my-text"
        e.target.style.color = "#f8f8ff"
        setStay(false)
      }
  //console.log(e.target.className)
  //setStay(prev => !prev)
  //console.log(stay)
  setStay(true)
}

function menuItem(e){
  console.log(e.target.textContent);
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
              <Anime onClick={stayDown}
              className="animate-my-text"
              key={i}
              style={{
                'animationDuration': `${speed}s`,
                'animationName': anName,
                
              }}>{char}</Anime>
             )}
          </div>
        ))}
      </div>
      <FontDrop_down handleClick={menuItem}/>
    </>
  )
}
