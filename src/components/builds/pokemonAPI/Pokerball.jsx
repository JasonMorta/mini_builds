import React, { useContext } from 'react'
import MonsterCard from './PokemonCard'
import png from './img/pokeapi_256.png'
import { useState } from 'react'
import { motion } from "framer-motion";  
import { StateContext } from '../../../StateManager';

export default function Pokerball() {

  const value = useContext(StateContext);
  let [mainState, setMainState] = value;


    const [state, setState] = useState(0)
    console.log(mainState.pokemonName);
  return (
    <motion.div
    initial={mainState.motion.initial}
    animate={mainState.motion.animate}
    exit={mainState.motion.exit}
    transition={mainState.motion.transition}
  >
        <img src={png} alt='logo' />
        <MonsterCard />
    </motion.div>
  )
}
