import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import "./tiles.css"

export default function Tile() {
  const [tiles, setTiles] = useState(10);
  const [bgc, setBgc] = useState("#FF6F61")
  const [count, setCount] = useState(1)

  let divs = [];
  let inc = 0;



  for (let i = 0; i < 6; i++) {

    let RN = Math.random().toFixed(2);
    divs.push(
      <div
        onAnimationStart={animationStart }
        onAnimationEnd ={animationEnd}
        onAnimationIteration={animationIteration}
        className="tile"
        onClick={(e)=> {e.target.style.backgroundColor = "#2196f3"}}
        style={{
          left: `${0 + inc}px`,
          animationDelay: `${RN}s`,
          backgroundColor: bgc,
          animationIterationCount: count,
        }}
      >
        {tiles}
      </div>
    );
    inc += 105;


  function animationStart(){
    console.log(bgc);
    setBgc("")
    setBgc("#FF6F61")
  }

  function animationEnd(){
    console.log("ended")
    
    setBgc("#FF6F61")
    if (count < 5) {
      setBgc("#FF6F61")
      setCount(prev => prev+1)
    }
  }

  function animationIteration(){
    
    setBgc("#FF6F61")
    
    console.log(bgc);
  
  }
}
   //keep track of tile position
  //  useEffect(() => {
  //   const timer = setInterval( tick, 20 );
  //   return () => clearInterval(timer);
  // }, [tick] );

  

  return (
    <div className="tile-container">
      {divs}

      <div className="tile-column1"> </div>
    </div>
  );
}
