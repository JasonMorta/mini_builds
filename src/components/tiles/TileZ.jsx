/* eslint-disable no-loop-func */
import React from "react";
import { useContext } from "react";
import { useState, useEffect, useRef } from "react";
import { StateContext } from "../../StateManager";
import Counter from "./Counter";
import "./tiles.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const randomX = () => gsap.utils.random(-400, 400, 1);

export default function TileMain() {
  // Create a sticky note (ref) to hold the score
  // const scoreRef = useRef(0);

  const container = useRef();

  useGSAP(
    () => {
      // gsap code here...
      gsap.to(".circle", {
        delay: 0.5,
        rotation: "360",
        stagger: {
          each: 0.5,
        },
        repeat: 5,
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

  

  const boxRef = useRef();

  const [endX, setEndX] = useState(0);

  useGSAP(()=>
  {
    gsap.to('.random_box', {
      x: endX,
      duration: 1,
      ease: "power2.inOut",
    });
  }, {dependencies: [endX], scope: container, revertOnUpdate: false});

  function handlePos() {
    setEndX(randomX());
    console.log('randomX()', randomX())
  }

  const { contextSafe } = useGSAP({scope: container})

  const handleBoxClicked = contextSafe(() => {
    console.log('clicked')
    gsap.to('.clickedBox', {
      rotate: randomX(),
    });
  });

  return (
    <div ref={container}>
      {/* <p>Score: {scoreRef.current}</p>
      <button onClick={increaseScore}>Increase Score</button> */}

      <button className="circle">1</button>
      <button className="circle">2</button>
      <button className="circle">3</button>
      <button className="circle">4</button>
      <button className="circle">5</button>
      <button onClick={handlePos}>Random position</button>
      <div className="random_box" ref={boxRef}>{endX}</div>
      <br />
      <button className="clickedBox" onMouseOver={handleBoxClicked}></button>
    </div>
  );
}
