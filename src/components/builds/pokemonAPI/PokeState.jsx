import React, { createContext, useState } from 'react'
import Pokerball from './Pokerball';



export const PokeStateContext = createContext();

export default function PokeState() {

    const [pokeState, setPokeState] = useState({
        pokemonName: "mewtwo-mega-y",
        pokeData: {},
    })


    
  return (
    <PokeStateContext.Provider value={[pokeState, setPokeState]} >
        <Pokerball />
    </PokeStateContext.Provider>
  )
}
