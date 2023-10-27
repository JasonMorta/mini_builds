import React, { useContext, useRef, useState } from "react";
import { StateContext } from "../../StateManager";

export default function Tile() {

  const value = useContext(StateContext);

  let [state, setState] = value;

  const [tiles, setTiles] = useState("Card");
  const [bgc, setBgc] = useState("#fff");


  let speed = 3;
  const selectedCount = useRef(0);

  let divs = []; // holds all teh cards
  let divs2 = [];
  let divs3 = [];
  let cardCounter = 0;
  let count = 11;
  let inc = 0; //used to set the distance between each card
  let scor = 0;
  // useEffect(() => {
  //   selectedCount.current =  selectedCount.current +1

  // }, [])

  //create each card with loop
  for (let i = 0; i < 6; i++) {
    //gives each card a random start time(0-1sec)
    divs.push();
    inc += 105;

    //Animation start Event
    function animationStart() {
      //console.log(bgc);
      // setBgc("");
      // setBgc("#fff");
    }

    //Animation End event
    function animationEnd() {
      //console.log("ended")
      //setTotalCards(selectedCount.current)
    }

    //Animation each iteration event
    //reset the bgc of the selected card on each loop
    // eslint-disable-next-line no-loop-func
    function animationIteration(e) {
      if ((e.target.style.backgroundColor = "rgb(33, 150, 243)")) {
        //
      }
      e.target.style.backgroundColor = "#fff";

      console.log("scor", scor);
    }
  }

  return (
    <div
      // onAnimationStart={animationStart}
      // onAnimationEnd={animationEnd}
      // onAnimationIteration={animationIteration}
      className="tile"
      onMouseDown={(e) => {
        e.target.style.backgroundColor = "rgb(33, 150, 243)";
        setState((prev) => ({ ...prev, score: state.score + 1 }));
        selectedCount.current++;
        console.log(state.score);
      }}
      style={{
        left: `${0 + inc}px`,
        animationDelay: `0.${Math.floor(Math.random() * 4)}s`,
        backgroundColor: bgc,
        animationIterationCount: count,
        animationDuration: `${speed}s`,
      }}
    ></div>
  );
}
