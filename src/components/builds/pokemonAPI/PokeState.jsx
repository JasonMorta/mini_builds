import React, { createContext, useState } from 'react'
import Main from './Main';
import Pokerball from './Pokerball';



export const PokeStateContext = createContext();

export default function PokeState() {

    const [pokeState, setPokeState] = useState({
        pokemonName: "mewtwo-mega-y",
        pokemonImage: "",
        searchInput: "pikachu-alola-cap",
        namesList:[],
        filters:["!A-Z", "!Weight", "!Height", "!Health"],
        type:["Normal","fighting","flying","poison","ground","rock","bug","ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy","unknown","shadow"],
        stats: {
          name:"",
          abilities: [],
          hp: "",
          height: "",
          weight: ""
        },
    })


    
  return (
    <PokeStateContext.Provider value={[pokeState, setPokeState]} >
        <Pokerball />
        <Main />
    </PokeStateContext.Provider>
  )
}
