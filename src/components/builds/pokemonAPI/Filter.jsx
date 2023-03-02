import React, { useState } from 'react'

export default function Filter(props) {

  const [types, setTypes] = useState()

const pokemonType = "fire";

function GetByType() {
  fetch(`https://pokeapi.co/api/v2/type/${pokemonType}`)
  .then(response => response.json())
  .then(data => {
    const pokemonList = data.pokemon;

    // loop through the list and print out the names of the Pokemon
    pokemonList.forEach(pokemon => {
      console.log(pokemon.pokemon.name);
    });
  });
}

  return (
    <button
    type="button"
    onClick={GetByType}
    className="btn btn-primary"
    >
    {props.btnName}
    </button>
  )
}
