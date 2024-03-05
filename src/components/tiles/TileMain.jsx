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



  useGSAP(
    () => {
      gsap.from(".button_box", {
        y: -200,
      });
      // gsap code here...
      gsap.to(".button_box", {
        y: 800,
        duration: 3,
        ease: "linear",
        stagger: {
          each: 0.5,
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

  return (
    <div className="tile_main" ref={container}>
      {/* <p>Score: {scoreRef.current}</p>
      <button onClick={increaseScore}>Increase Score</button> */}

      <button onClick={handleTileClicked} className="button_box">1</button>
   
    </div>
  );
}
