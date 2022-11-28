import React from 'react'
import MonsterCard from './MonsterCard'
import png from './img/pokeapi_256.png'
import { useState } from 'react'

export default function Pokerball() {
    const [state, setState] = useState(0)
  return (
    <div>
        <img src={png} alt='logo' />
        <MonsterCard 
            updateParent={()=>{
              
                setState(prev => prev+1)
                console.log(state);
                }}/>
    </div>
  )
}
