import React, { useContext } from 'react'
import { PokeStateContext } from '../PokeState';
import CSS from './ImageLayout.module.css'

export default function Sprites() {

    const value = useContext(PokeStateContext);
    const [pokeState, setPokeState] = value;



    //omit the "else" condition in the following ternary operators
    //If the condition before the && is true, 
    //then the expression after the && will be evaluated and returned. 
    //If the condition before the && is false, then the expression after 
    //the && will not be evaluated at all and will be skipped.
    //The short-circuit conditional syntax 
    //allows us to omit it in cases where we only need to check for a single condition.
  return (
    <div className={CSS.all_sprites}>
      <div className={CSS.sprites}>
        {pokeState.pokemonObject?.sprites?.front_default !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.front_default}
            alt={pokeState.selectedName}/>
        )}
        {pokeState.pokemonObject?.sprites?.front_shiny !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.front_shiny}
            alt={pokeState.selectedName}
          />
        )}
        {pokeState.pokemonObject?.sprites?.back_default !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.back_default}
            alt={pokeState.selectedName}
          />
        )}
        {pokeState.pokemonObject?.sprites?.front_female !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.front_female}
            alt={pokeState.selectedName}
          />
        )}
        {/* {pokeState.pokemonObject?.sprites?.back_female !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.back_female}
            alt={pokeState.selectedName}
          />
        )}
        {pokeState.pokemonObject?.sprites?.back_shiny !== null && (
          <img
            src={pokeState.pokemonObject?.sprites?.back_shiny}
            alt={pokeState.selectedName}
          />
        )} */}
      </div>
    </div>
  );
}
