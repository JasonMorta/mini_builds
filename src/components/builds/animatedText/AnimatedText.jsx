import React, { useContext } from "react";
import { useState } from "react";
import styled from "styled-components";
import { StateContext } from "../../../StateManager";
import "./AnimatedText.css";
import FontDropDown from "./FontDrop_down";
import Slider from "./Slider";
import { motion } from "framer-motion";

export default function AnimatedText() {
  const value = useContext(StateContext);

  let [share, setShare] = value;

  const [state, setState] = useState("Animated Text");
  const [stay, setStay] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [animationClass, setAnimationClass] = useState("text-pop-up-top");
  const [fontSize, setFontSize] = useState(50);

  //let anName = "tracking-in-contract-bck-top"

  function textInput(e) {
    setState(e.target.value);
    console.log("state", state.split(" "));
  }

  //keeps the selected letter down
  function stayDown(e) {
    if (e.target.className.includes("animate-my-text")) {
      e.target.className = "animate-my-text stayDown";
      e.target.style.color = "#ffeb3b !important";
      setStay(true);
    } else {
      e.target.className = "animate-my-text";
      e.target.style.color = "#f8f8ff";
      setStay(false);
    }
  }

  function menuItem(e) {
    setAnimationClass(e.target.textContent);
  }

  //Use styled-components package to access the ::before attribute
  let Anime = styled.h1`
color: green,
&:hover {
  animation: none;
  transition: .3s;
  font-size: 50px
}`;

  function onchange(e) {
    setFontSize(e.target.value);
  }

  return (
    <motion.div
      initial={share.motion.initial}
      animate={share.motion.animate}
      exit={share.motion.exit}
      transition={share.motion.transition}
    >
      <h2>Enter some text</h2>
      <div id="inputField">
        <input
          onInput={textInput}
          type="text"
          defaultChecked={state}
          className="inputs"
          placeholder={state}
          id="x"
        />
      </div>
      <div className="animated_text">
        {state.split(" ").map((item, index) => (
          <div className="index-container">
            {item.split("").map((char, i) => (
              <Anime
                onClick={stayDown}
                className={`animate-my-text ${animationClass}`}
                key={i}
                style={{
                  fontSize: `${fontSize}px`,
                  animationDuration: `${speed + i / 5}s`,
                }}
              >
                {char}
              </Anime>
            ))}
          </div>
        ))}
      </div>
      <p>Remove animation effect from selected letters</p>
      <p>Choose transition</p>
      <FontDropDown title={animationClass} handleClick={menuItem} />
      <Slider
        text={`Font-Size ${fontSize}px`}
        onChange={onchange}
        className="font-slider"
      />
    </motion.div>
  );
}
