import React, { useContext } from 'react'
import { PokeStateContext } from '../PokeState';
import CSS from './Stats.module.css'

export default function Stats() {

const value = useContext(PokeStateContext);
  const [state, setState] = value;


    //Scale baseStats to 100% as max value is 225
    function scaleBaseStat(baseStat) {
        return Math.round((baseStat / 255) * 100);
      }
      

  return (
     <div className={CSS.stats_container}>
      {state.stats.base.map((stat) => (
        <div key={stat.stat.name}>
          <span>{stat.stat.name.toUpperCase()}: {`${scaleBaseStat(stat.base_stat)}%`}</span>
          <div className={CSS.progress_bar}>
            <div
              className={CSS.progress_bar_fill}
              style={{ width: `${scaleBaseStat(stat.base_stat)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
