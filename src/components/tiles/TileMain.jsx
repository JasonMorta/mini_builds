/* eslint-disable no-loop-func */
import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { StateContext } from "../../StateManager";
import Counter from "./Counter";
import "./tiles.css";


export default function TileMain() {
    // Create a sticky note (ref) to hold the score
    const scoreRef = useRef(0);


    // Function to increase the score
    const increaseScore = () => {
      scoreRef.current += 10;
      console.log('scoreRef', scoreRef.current)
      // Even though we changed the score, the component won't re-render
    };
  
  return (

    <div>
    <p>Score: {scoreRef.current}</p>
    <button onClick={increaseScore}>Increase Score</button>
  </div>

  );
}
