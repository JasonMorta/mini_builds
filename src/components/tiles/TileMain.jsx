/* eslint-disable no-loop-func */
import {useEffect, useRef} from "react";
import "./tiles.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
// Importing Prism.js
import Prism from 'prismjs';
import { useSprings, animated } from '@react-spring/web'


export default function TileMain() {
  // Create a sticky note (ref) to hold the score
  // const scoreRef = useRef(0);

  const container = useRef();
  const buttonPosition = gsap.utils.selector(container);

  const springs = useSprings(2, {
    from: { opacity: 0 },
    to: { opacity: .2 },
  })

  //Generates a random number when called
  //Can be used where ever you want to generate a random number.
  function getRandomNum(param) {
    console.log('param', param)
    let randomNum = (Math.random() * 1 + 0).toFixed(1);
;
    return parseFloat(randomNum);
  }

  useEffect(() => {
    Prism.highlightAll();
  }, []);

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



  const { contextSafe } = useGSAP({ scope: container });

  const handleTileClicked = (event) => {
    // const button = event.currentTarget[0]._gsap.y;
    // console.log('button[0]._gsap.y', button[0]._gsap.y)
    // const position = buttonPosition(button);
  };

  const columnOne = [1].map((number, index) => {
    return (
      <button onClick={handleTileClicked} className="button_box1 box">
        {number}
      </button>
    );
  });

  const columnTwo = [2].map((number, index) => {
    return (
      <button onClick={handleTileClicked} className="button_box2 box">
        {number}
      </button>
    );
  });

  return (
    <section className="tiles_section">
      <p>The section utilized gsap to simplify element animations</p>
      <div className="tile_main" ref={container}>
        {/* <p>Score: {scoreRef.current}</p>
        <button onClick={increaseScore}>Increase Score</button> */}

        <div className="column_one">{columnOne}</div>
        <div className="column_two">{columnTwo}</div>
        <pre>
          <code className="language-js">
            {`const greet = () => console.log('Hello, world!');`}
          </code>
        </pre>
       
      </div>
      <div>
      {springs.map(props => (
        <animated.div style={props}>Hello World</animated.div>
      ))}
    </div>
    </section>
  );
}
