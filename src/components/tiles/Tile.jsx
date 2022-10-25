import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Counter from './Counter';
import "./tiles.css";

export default function Tile() {
  const [tiles, setTiles] = useState("Card");
  const [bgc, setBgc] = useState("#FF6F61")
  const [count, setCount] = useState(112)
  const [totalCards, setTotalCards] = useState(0)
  const [speed, setSpeed] = useState(3)
  const selectedCount = useRef(0);

  let divs = [];// holds all teh cards
  let divs2 = [];
  let divs3 = [];
  let cardCounter = 0;
  let inc = 0;//used to set the distance between each card

  // useEffect(() => {
  //   selectedCount.current =  selectedCount.current +1
  
  // }, [])
  

//create each card with loop
  for (let i = 0; i < 4; i++) {

    //gives each card a random start time(0-1sec)
  divs.push(
      <div
        onAnimationStart={animationStart }
        onAnimationEnd ={animationEnd}
        onAnimationIteration={animationIteration}
        className="tile"
        onMouseDown={(e)=> {
          e.target.style.backgroundColor = "rgb(33, 150, 243)"
          //setSelectCounter(prev => prev +1)
          selectedCount.current++
          console.log( selectedCount.current);
        }}

        
        style={{
          left: `${0 + inc}px`,
          animationDelay: `0.${Math.floor(Math.random() * 4)}s`,
          backgroundColor: bgc,
          animationIterationCount: count,
          animationDuration: `${speed}s`
        }}
      >
        
      </div>
    );
  divs2.push(
      <div
        onAnimationStart={animationStart }
        onAnimationEnd ={animationEnd}
        onAnimationIteration={animationIteration}
        className="tile"
        onMouseDown={(e)=> {
          e.target.style.backgroundColor = "rgb(33, 150, 243)"
          //setSelectCounter(prev => prev +1)
          selectedCount.current++
          console.log( selectedCount.current);
        }}

        
        style={{
          left: `${0 + inc}px`,
          animationDelay: `1.${Math.floor(Math.random() * 4)}s`,
          backgroundColor: bgc,
          animationIterationCount: count,
          animationDuration: `${speed}s`
        }}
      >
        
      </div>
    );
  divs3.push(
      <div
        onAnimationStart={animationStart }
        onAnimationEnd ={animationEnd}
        onAnimationIteration={animationIteration}
        className="tile"
        onMouseDown={(e)=> {
          e.target.style.backgroundColor = "rgb(33, 150, 243)"
          //setSelectCounter(prev => prev +1)
          selectedCount.current++

        }}

        
        style={{
          left: `${0 + inc}px`,
          animationDelay: `2.${Math.floor(Math.random() * 4)}s`,
          backgroundColor: bgc,
          animationIterationCount: count,
          animationDuration: `${speed}s`
        }}
      >
        
      </div>
    );


    inc += 105;

    //Animation start Event
  function animationStart(){
    //console.log(bgc);
    setBgc("")
    setBgc("#FF6F61")
  }

  //Animation End event
  function animationEnd(){
    console.log("ended")
    setTotalCards(selectedCount.current)
  }

  //Animation each iteration event
  //reset the bgc of the selected card on each loop
  // eslint-disable-next-line no-loop-func
  function animationIteration(e){
    e.target.style.backgroundColor = "#FF6F61";
    
    //console.log(selectedCount.current);
  }
}

  

  return (
    <div className="tile-container">
      <div className='hide-cards-top'></div>
      {divs}

   

      <Counter LCounter={selectedCount.current} />
      <div className="tile-column1"> </div>
      <div className='hide-cards-bot'></div>
    </div>
  );
}
