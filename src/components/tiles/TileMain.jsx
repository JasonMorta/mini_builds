/* eslint-disable no-loop-func */
import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { StateContext } from "../../StateManager";
import Counter from "./Counter";
import "./tiles.css";
import gsap from "gsap";
import { useGSAP  } from "@gsap/react";

const randomX = () => gsap.utils.random(-400, 400, 1);

// Then register it with GSAP


export default function TileMain() {
  // Create a sticky note (ref) to hold the score
  // const scoreRef = useRef(0);

  const container = useRef();
  const buttonPosition = gsap.utils.selector(container);


  //Generates a random number when called
  //Can be used where ever you want to generate a random number.
  function getRandomNum(){
      let randomNum = ((Math.random() * 1) + 0).toFixed(1);
      return parseFloat(randomNum)
  }

  useEffect(() => {
  }
  ,[])



  useGSAP(
    () => {
      gsap.from(".box", {
        y: -300,
      });
      // gsap code here...
      gsap.to(".box", {
        y: 750,
        duration: 3,
        ease: "linear",
        stagger: {
          each: getRandomNum(),
        },
        repeat: -1,
      }); // <-- automatically reverted
    },
    { scope: container }
  ); // <-- scope is for selector text (optional)

  // Function to increase the score
  // const increaseScore = () => {
  //   scoreRef.current += 10;
  //   console.log("scoreRef", scoreRef.current);
  //   // Even though we changed the score, the component won't re-render
  // };

// useGSAP(()=>{
//   let button = buttonPosition(".button_box");
//   if (button[0]._gsap.y > "600px" ){

//     console.log("button", button[0]._gsap.y);
//   } 

// }, {scope: container, revertOnUpdate: false});



  const { contextSafe } = useGSAP({scope: container})

  const handleTileClicked = (event) => {
    // const button = event.currentTarget[0]._gsap.y;
   

   // console.log('button[0]._gsap.y', button[0]._gsap.y)
    // const position = buttonPosition(button);
  
  }

  const columnOne =  [1].map((number, index) => {
    return (
        <button onClick={handleTileClicked} className="button_box1 box">{number}</button>
    )
  })
  
  const columnTwo =  [2].map((number, index) => {
    return (
        <button onClick={handleTileClicked} className="button_box2 box">{number}</button>
    )
  })

  return (
    <section className="tiles_section">
      <p>The section utilized gsap to simplify element animations</p>
      <div className="tile_main" ref={container}>
        {/* <p>Score: {scoreRef.current}</p>
        <button onClick={increaseScore}>Increase Score</button> */}
  
        <div className="column_one">
         {columnOne}
        </div>
        <div className="column_two">
  
         {columnTwo}
        </div>
     
      </div>
    </section>
  );
}
