import React from 'react';
import { useState } from 'react';
import './AnimatedText.css'

export default function AnimatedText() {

  const [state, setState]= useState("Animated Text");
  const [animate, setanimate] = useState({
    
  })
  
  const [stay, setStay]= useState(false)

let speed = 0.5;

function textInput(e){
setState(e.target.value);
console.log('state', state.split(" "));
}

//keeps the selected letter down
function stayDown(e){
  
  if (e.target.className === "text-pop-up-top") {
      e.target.className = "text-pop-up-top stayDown"
      setStay(true)
      e.target.style.color = "hotpink"
      } else {
        e.target.className = "text-pop-up-top"
        e.target.style.color = "#f8f8ff"
        setStay(false)
      }
  //console.log(e.target.className)
  //setStay(prev => !prev)
  //console.log(stay)
  setStay(true)
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
          
        {state.split(" ").map((item, index) => (
          <div className='index-container'>
             {item.split("").map((char,i) => 
              <h1 onClick={stayDown}
              className="text-pop-up-top"
              key={i}
              style={{'animationDuration': `${speed}s`}}>{char}</h1>
             )}
          </div>
        ))}
      </div>
    </>
  )
}
