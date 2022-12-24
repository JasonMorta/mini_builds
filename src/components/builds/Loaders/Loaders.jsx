/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { StateContext } from "../../../StateManager";
import "./loaders.css";
import "./sliderAnimations.css";
import { motion } from "framer-motion";

export default function Loaders() {
  const value = useContext(StateContext);
  let [mainState, setMainState] = value;

  const [currentTime, setCurrentTime] = useState(0);
  const [loadText, setLoadText] = useState("Loading...");

  let allSlides = [];
  let load = 0;

  const progress = () => {
    //Stop when bar is full
    if (currentTime !== 100) {
      setCurrentTime((prev) => prev + 1);
    }

    //Change text when full
    if (load === 100) {
      load++;
    }
  };

  //build slides
  for (let i = 0; i < 6; i++) {
    allSlides.push(
      <div
        key={i}
        className="slide slide-in-left"
        style={{
          width: `${i === 0 ? 1 : i + 1}0%`,
          animationDuration: `0.7${+i}s`,
          animationDelay: ` 0.${i}s`,
        }}
      ></div>
    );
  }
  //Increment every 20ns
  useEffect(() => {
    const timer = setInterval(progress, 20);
    return () => clearInterval(timer);
  }, [progress]);

  //Use styled-components package to access the ::before attribute
  const H3 = styled.h3`
    font-weight: bold;
    &:before {
      content: "${load}";
      width: 100%;
      animation: example 1s ease-out;
    }
    @keyframes example {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  `;

  return (
    <motion.div
    initial={mainState.motion.initial}
    animate={mainState.motion.animate}
    exit={mainState.motion.exit}
    transition={mainState.motion.transition}
  >
      <section className="loading-bar">
        <p>useEffect with setInterval trick</p>
        <h1>{currentTime}%</h1>
        <H3 className="h3Style">{load}</H3>
        <div className="slide-container">{allSlides}</div>
      </section>
      
    </motion.div>
  );
}
