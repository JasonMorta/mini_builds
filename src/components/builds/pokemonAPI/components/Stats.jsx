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
  console.log("props", props);

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
        <div key={stat.stat.name}>
          <span>
            {stat.stat.name.toUpperCase()}:{" "}
            {`${scaleBaseStat(stat.base_stat)}%`}
          </span>
          {console.log(
            "scaleBaseStat(stat.base_stat): ",
            scaleBaseStat(stat.base_stat)
          )}
          <div className={CSS.progress_bar} ref={ref} >
          <animated.div
              className={CSS.fill}
              style={{
                width: props.width.to(
                  (value) => `${scaleBaseStat(stat.base_stat)}%`
                )}}
            />
            <animated.div
              className={CSS.content}
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
