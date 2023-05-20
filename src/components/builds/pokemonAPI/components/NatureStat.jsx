import React, { useContext, useEffect, useState } from 'react'
import { PokeStateContext } from '../PokeState';
import CSS from './NatureStat.module.css'

export default function NatureStat() {
    const value = useContext(PokeStateContext);
    const [state, setState] = value;
    const [stats, setStats] = useState()


   useEffect(() => {
    setStats(state.pokemonObject?.types)
   }, [value])

  return (
    <div  className={CSS.nature_labels_container} >
        {stats ? stats.map((value, i)=>(
            <div key={i} className={CSS.nature_labels}>
            <p>{value.type?.name.charAt(0).toUpperCase() + value.type?.name.slice(1)}</p>
            </div>
        )) : null}
    </div>
  )
}
