import produce from 'immer';
import React, { useContext, useEffect, useState } from 'react'
import { PokeStateContext } from '../PokeState';
import CSS from './ImageLayout.module.css'
import Skeleton from '@mui/material/Skeleton';
import Sprites from './Sprites';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PokemonImage() {
  console.log(`%c PokemonImage`, 'color: #2196f3')



  let location = useLocation()
  console.log('Image location', location)


  let params = useParams()
  console.log('params', params)



  

    const [pokeState, setPokeState] = useState({pokemonObject: null})


 

    useEffect(() => {
        //Get all pokemon image
        //console.log(`%c ${pokeState.selectedName}`, 'color: orange')
      async function fetchData() {
        await fetch("https://pokeapi.co/api/v2/pokemon/"+location.state.name)
          .then((response) => response.json())
          .then(async(  data) => {
            console.log('data', data)
            //use data here
             setPokeState(
                  produce((pokeState) => {
                    pokeState.pokemonObject = data;
                    //pokeState.inputName = pokeState.pokemonObject.species.name
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

          });
      }
      fetchData()
      }, [])

      const [bgColor, setBgColor] = useState({
        normal:
          "linear-gradient(to bottom, #a8a878, #d6b59b, #ecc9c8, #f2e4ec, #ffffff)",
        ice: "linear-gradient(to bottom, #9ee4d9, #b4eaf2, #d3efff, #eff5ff, #ffffff)",
        fire: "linear-gradient(to bottom, #f08030, #ff908b, #ffb5d2, #fbddf9, #ffffff)",
        water:
          "linear-gradient(to bottom, #6890f0, #9aa9f3, #c1c4f7, #e2e1fb, #ffffff)",
        grass:
          "linear-gradient(to bottom, #78c850, #30dfb9, #73eafd, #d1f0ff, #ffffff)",
        electric:
          "linear-gradient(to bottom, #fddb54, #ffcd98, #ffd6df, #ffedff, #ffffff)",
        fighting:
          "linear-gradient(to bottom, #c03028, #dd627c, #e49ac0, #e8cfeb, #ffffff)",
        poison:
          "linear-gradient(to bottom, #a040a0, #af75c0, #c3a5da, #ddd2ef, #ffffff)",
        ground:
          "linear-gradient(to bottom, #e0c068, #ffc19e, #ffd1d7, #ffe9fa, #ffffff)",
        flying:
          "linear-gradient(to bottom, #a890f0, #bdacf5, #d2c7fa, #e8e3fd, #ffffff)",
        psychic:
          "linear-gradient(to bottom, #f85888, #f689be, #efb5e4, #efdcf9, #ffffff)",
        bug: "linear-gradient(to bottom, #a8b820, #ffb168, #ffbebe, #ffe0f7, #ffffff)",
        rock: "linear-gradient(to bottom, #b8a038, #f4a67c, #ffbdc3, #fbdff2, #ffffff)",
        ghost:
          "linear-gradient(to bottom, #705898, #9080b3, #b3a9cd, #d8d4e6, #ffffff)",
        dark: "linear-gradient(to bottom, #705848, #977c79, #b8a6ab, #d8d2d8, #ffffff)",
        dragon:
          "linear-gradient(to bottom, #7038f8, #946fff, #b7a0ff, #dad0ff, #ffffff)",
        steel:
          "linear-gradient(to bottom, #b8b8d0, #cac9db, #dcdbe7, #eeedf3, #ffffff)",
        fairy:
          "linear-gradient(to bottom, #f0b6bc, #f1c8d7, #f1dbeb, #f5eef8, #ffffff)",
      });


  function createBackground() {
   

    if (pokeState.pokemonObject !== null) {
      let col =
      pokeState?.pokemonObject?.types[0]?.type?.name === "normal"
        ? bgColor.normal
        : pokeState?.pokemonObject?.types[0]?.type?.name === "ice"
        ? bgColor.ice
        : pokeState?.pokemonObject?.types[0]?.type?.name === "fire"
        ? bgColor.fire
        : pokeState?.pokemonObject?.types[0]?.type?.name === "water"
        ? bgColor.water
        : pokeState?.pokemonObject?.types[0]?.type?.name === "grass"
        ? bgColor.grass
        : pokeState?.pokemonObject?.types[0]?.type?.name === "electric"
        ? bgColor.electric
        : pokeState?.pokemonObject?.types[0]?.type?.name === "fighting"
        ? bgColor.fighting
        : pokeState?.pokemonObject?.types[0]?.type?.name === "poison"
        ? bgColor.poison
        : pokeState?.pokemonObject?.types[0]?.type?.name === "ground"
        ? bgColor.ground
        : pokeState?.pokemonObject?.types[0]?.type?.name === "flying"
        ? bgColor.flying
        : pokeState?.pokemonObject?.types[0]?.type?.name === "psychic"
        ? bgColor.psychic
        : pokeState?.pokemonObject?.types[0]?.type?.name === "bug"
        ? bgColor.bug
        : pokeState?.pokemonObject?.types[0]?.type?.name === "rock"
        ? bgColor.rock
        : pokeState?.pokemonObject?.types[0]?.type?.name === "ghost"
        ? bgColor.ghost
        : pokeState?.pokemonObject?.types[0]?.type?.name === "dark"
        ? bgColor.dark
        : pokeState?.pokemonObject?.types[0]?.type?.name === "dragon"
        ? bgColor.dragon
        : pokeState?.pokemonObject?.types[0]?.type?.name === "steel"
        ? bgColor.steel
        : pokeState?.pokemonObject?.types[0]?.type?.name === "fairy"
        ? bgColor.fairy
        : "black";
        return col
    } else {
      return "gray"
    }
       
  }


  return (
    <div className={CSS.pokemon_images}>
      {pokeState.pokemonObject !== undefined ? (
        <>
          <div className={CSS.poke_BG_color} style={{backgroundImage: createBackground()}}></div>
          <div className={CSS.main_image_container}>
           {pokeState.pokemonObject?.sprites?.other["official-artwork"]?.front_default !== null && <img
              className={CSS.mainImage}
              src={
                pokeState.pokemonObject?.sprites?.other["official-artwork"]?.front_default
              }
              alt={pokeState.selectedName}
            />}
          </div>
          {/* <Sprites /> */}
        </>
      ) : (
        <div>
          <Skeleton
            variant="rectangular"
            width="470px"
            height="475px"
            style={{ margin: "10px 0px 10px" }}
          ></Skeleton>
        </div>
      )}
    </div>
  );
}
