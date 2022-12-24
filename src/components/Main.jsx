import React, { useContext, useState } from "react";
import "./Main.css";
import "./builds/Loaders/sliderAnimations.css";
import { motion } from "framer-motion";
import { StateContext } from "../StateManager";

export default function Main() {

  const value = useContext(StateContext);
  let [state, setState] = value;

  const [heading, setHeading] = useState("Mini.Builds");

  let header = heading.split("").map((char, idx) => (
    <h1
      key={idx}
      className={idx % 2 === 0 ? "slide-in-tr " : "slide-in-tl "}
      style={{
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        animationDelay: ` 0.${idx}s`,
      }}
    >
      {char}
    </h1>
  ));

  return (
    <motion.div
      initial={state.motion.initial}
      animate={state.motion.animate}
      exit={state.motion.exit}
      transition={state.motion.transition}
    >

    <div className="main_section">
      {header}
    
    </div>

  </motion.div>
    );
}
