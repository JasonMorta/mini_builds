import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react'
import { PokeStateContext } from '../PokeState';
import CSS from './ImageLayout.module.css'
import Skeleton from '@mui/material/Skeleton';

export default function PokemonImage() {

    const value = useContext(PokeStateContext);
    const [pokeState, setPokeState] = value;

    const [loadImages, setLoadImages] = useState()


    useEffect(() => {
        //Get all pokemon image
        console.log(`%c ${pokeState.selectedName}`, 'color: orange')
      async function fetchData() {
        await fetch("https://pokeapi.co/api/v2/pokemon/"+pokeState.selectedName)
          .then((response) => response.json())
          .then(async(  data) => {
            //use data here
            await setPokeState(
                  produce((pokeState) => {
                    pokeState.pokemonObject = data;
                    pokeState.inputName = pokeState.pokemonObject.species.name
                  })
                );
          })
          .catch((error) => {
            console.error(error)
            console.log('%c ⚠ Pokemon not found ⚠ ', 'background-color: #dc3545')
            setPokeState(
              produce((pokeState) => {
                pokeState.pokemonObject = 'Pokemon not found';
              })
            );

            console.log('state: ',pokeState.pokemonObject)
          });
      }
      fetchData()
      }, [pokeState.selectedName])



      console.log('state.pokemonObject: ',pokeState.pokemonObject)






  return (
    <div className={CSS.images}>
        {pokeState.pokemonObject !== null ? 
        <>
        <img className={CSS.mainImage} src={pokeState.pokemonObject.sprites.other["official-artwork"].front_default} alt={pokeState.selectedName} />
        <div className={CSS.sprites}>
          <img src={pokeState.pokemonObject.sprites.front_default} alt={pokeState.selectedName} />
          <img src={pokeState.pokemonObject.sprites.front_shiny} alt={pokeState.selectedName} />
          <img src={pokeState.pokemonObject.sprites.back_default} alt={pokeState.selectedName} />
          <img src={pokeState.pokemonObject.sprites.front_female} alt={pokeState.selectedName} />
          <img src={pokeState.pokemonObject.sprites.back_female} alt={pokeState.selectedName} />
          <img src={pokeState.pokemonObject.sprites.back_shiny} alt={pokeState.selectedName} />
        </div>
        
        </> 
        : 
        <div >
          <Skeleton
          variant="rectangular"
          width="470px"
          height="475px"
          style={{ margin: "10px 0px 10px" }}
        ></Skeleton>
        </div>
      
      }
                       
                 
              
    </div>
  )
}
