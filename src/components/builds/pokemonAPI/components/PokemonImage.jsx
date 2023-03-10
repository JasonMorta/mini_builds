import produce from 'immer';
import React, { useContext, useEffect } from 'react'
import { PokeStateContext } from '../PokeState';

export default function PokemonImage() {

    const value = useContext(PokeStateContext);
    const [state, setState] = value;


    useEffect(() => {
        //Get all pokemon image
      async function fetchData() {
        await fetch("https://pokeapi.co/api/v2/pokemon/"+state.selectedName)
          .then((response) => response.json())
          .then((data) => {
            //use data here
              setState(
                  produce((state) => {
                    state.pokemonObject = data;
                  })
                );
                console.log('%cFetched Pokemon Object', 'color: green')
          })
          .catch((error) => console.error(error));
      }
      fetchData()

      }, [state.selectedName])

  return (
    <div>
        

    </div>
  )
}
