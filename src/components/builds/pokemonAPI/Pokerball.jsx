import React, { useContext } from 'react'
import MonsterCard from './MonsterCard'
import png from './img/pokeapi_256.png'
import { useState } from 'react'
import { motion } from "framer-motion";  
import { StateContext } from '../../../StateManager';

export default function Pokerball() {

  const value = useContext(StateContext);
  let [mainState, setMainState] = value;


    const [state, setState] = useState(0)
  return (
    <motion.div
    initial={mainState.motion.initial}
    animate={mainState.motion.animate}
    exit={mainState.motion.exit}
    transition={mainState.motion.transition}
  >
        <img src={png} alt='logo' />
        <MonsterCard 
            updateParent={()=>{
              
                setState(prev => prev+1)
                console.log(state);
                }}/>
    </motion.div>
  )
}
