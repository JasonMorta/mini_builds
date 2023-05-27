import React, { useContext, useLayoutEffect } from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { StateContext } from "../../../StateManager";
import { motion } from "framer-motion";

const loaderAnimation = keyframes`
  0% {
   width: 0;
  }
  100% {
    width: 100%;
  }
`;

const Loader = styled.div`
  width: 50px;
  height: 50px;
  background-color: hotpink;
  animation: ${loaderAnimation} 1s linear forwards;
`;

export default function Loaders() {
  const value = useContext(StateContext);
  const [mainState, setMainState] = value;

  useLayoutEffect(() => {
    const load = document.querySelector(".loader_1");
    const loadingText = document.querySelector(".loader_container h1");
    // set the progress bar to 0
  }, []);

  return (
    <>
      <section className="loading-bar">
        <div className="loader_container">
          <h1></h1>
          <Loader className="loader_1" />
        </div>
      </section>
    </>
  );
}
