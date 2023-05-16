import React, { useContext, useEffect, useState } from "react";
import { PokeStateContext } from "../PokeState";
import useMeasure from "react-use-measure";
import { useSpring, animated } from "@react-spring/web";
import CSS from "./Stats.module.css";

export default function Stats() {
  const value = useContext(PokeStateContext);
  const [state, setState] = value;

  //Spring animation
  const [open, toggle] = useState(false);
  const [ref, { width }] = useMeasure(); //mesuer width of container
  const props = useSpring({ width: open ? width : 0 });

  //Scale baseStats to 100% as max value is 225
  function scaleBaseStat(baseStat) {
    return Math.round((baseStat / 255) * 100);
  }

  useEffect(() => {
    function loader() {
      setTimeout(() => {
        toggle(!open);
      }, 500);
    }
    loader();
  }, []);

  return (
    <div className={CSS.stats_container}>
      {state.stats.base.map((stat) => (
        <div key={stat.stat.name} ref={ref}>
          <animated.div
            className={CSS.content}
        
          >{props.width.to(x => (
            stat.stat.name.toUpperCase() === "HP"
              ? 'HP: '+(scaleBaseStat(stat.base_stat) * 15)
              : stat.stat.name.toUpperCase()+ ' ' +(scaleBaseStat(stat.base_stat) * 2)
          ))}
          
       
          </animated.div>

          <div className={CSS.progress_bar}>
            <animated.div
              className={CSS.fill}
              style={{
                width: props.width.to(
                  (value) => `${scaleBaseStat(stat.base_stat)}%`
                ),
              }}
            />

            <div />
          </div>
        </div>
      ))}
    </div>
  );
}
