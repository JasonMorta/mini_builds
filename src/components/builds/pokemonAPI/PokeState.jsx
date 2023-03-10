import React, { createContext, useState } from 'react'
import Main from './Main';
import Pokerball from './Pokerball';



export const PokeStateContext = createContext();

export default function PokeState() {

    const [pokeState, setPokeState] = useState({
        pokemonName: "pikachu",
        pokemonObject: null,
        searchInput: null,
        namesList:[],
        selectedName: "pikachu",
        filters:["!A-Z", "!Weight", "!Height", "!Health"],
        type:["Normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"],
        stats: {
          name:null,
          abilities: [],
          hp: null,
          height: null,
          weight: null
        },
    })


    
  return (
    <PokeStateContext.Provider value={[pokeState, setPokeState]} >
        <Main />
    </PokeStateContext.Provider>
  )
}
