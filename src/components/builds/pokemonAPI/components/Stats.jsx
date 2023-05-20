import React, { useContext, useEffect, useRef, useLayoutEffect } from "react";
import { PokeStateContext } from "../PokeState";
import { gsap } from "gsap";
import CSS from "./Stats.module.css";

export default function Stats() {
  const value = useContext(PokeStateContext);
  const [state, setState] = value;
  //Scale baseStats to 100% as max value is 225
  // function scaleBaseStat(baseStat) {
  //   return Math.round((baseStat / 255) * 100);
  // }

  useLayoutEffect(() => {
    state.stats?.base?.map((value, index) => {

      const percentage = document.querySelectorAll(`.${CSS.stat_bar_progress}`)[
        index
      ];
      const statDisplay = document.querySelectorAll(`.${CSS.stat_percentage}`)[
        index
      ];

      const statValue = `${Math.round(value.base_stat)}`;

      //set the progress bar to 0
      gsap.to(percentage, {
        width: statValue + "px",
        ease: "ease",
        duration: 2,
      });

      //Set the progress bar to the stat value
      gsap.to(statDisplay, {
        width: statValue,
        onUpdate: () => {
          //Set the stat value to the stat display
          if (value.stat.name === "hp" || value.stat.name === "defense") {
            //hp is the only stat that is not out of 255
            statDisplay.textContent = `${Math.round(
              parseInt(percentage.style.width)*5
            )}`;
          } else {
            //Multiply the stat value by 5 to get the actual value
            statDisplay.textContent = `${parseInt(percentage.style.width)}`;
          }
        },
        ease: "ease",
        duration: 2,
      });
    });
  }, [state]);

  return (
    <div className={CSS.stats_container}>
      {state.stats?.base?.map((value, index) => (
        <div className={CSS.stat_bar_outer} key={index}>
          <span className={CSS.stat_name}>
            {value.stat.name.charAt(0).toUpperCase() +
              value.stat.name.slice(1) +
              ": "}
          </span>
          <span className={CSS.stat_percentage}></span>
          <div className={CSS.stat_bar_container}>
            <div className={CSS.stat_bar_progress}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
