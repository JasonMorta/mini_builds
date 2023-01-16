/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import chuckie from "./pics/chuck.png";
import React, { useContext } from "react";
import "./Jokes.css";
import { useState, useEffect } from "react";
import BsButton from "../BsButton";
import FetchJoke from "./FetchJoke";
import { StateContext } from "../../../StateManager";
import Category from "./Category";
import { motion } from "framer-motion";

export default function Jokes() {
  const value = useContext(StateContext);
  let [mainState, setMainState] = value;

  return (
    <motion.div
      initial={mainState.motion.initial}
      animate={mainState.motion.animate}
      exit={mainState.motion.exit}
      transition={mainState.motion.transition}
    >
      <section style={{ width: "80%", margin: "auto" }}>
        <img
          src={chuckie}
          width={300}
          className="chuck"
          alt="chuck"
        />
        <div className="chuck-jokes">
          <FetchJoke />
          <div className="chuck_divider"></div>
          <FetchJoke />
          <div className="chuck_divider"></div>
          <FetchJoke />
        </div>
      </section>
      <div className="chuck_btns">
        <BsButton
          handleClick={() =>
            setMainState((prev) => ({ ...prev, nextJoke: !mainState.nextJoke }))
          }
          className={"new-joke-btn"}
          text={"Next Joke"}
          variant={"danger"}
        />

        <Category />
      </div>
    </motion.div>
  );
}
