import produce from "immer";
import React, { useContext, useEffect } from "react";
import { PokeStateContext } from "../PokeState";
import CardSkeleton from "./CardSkeleton";
import CSS from "./PokemonMainImage.module.css";

export default function PokemonMainImage() {
  const value = useContext(PokeStateContext);
  const [state, setState] = value;

  const [pokemonImage, setPokemonImage] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);


    const imageStyle = {
        opacity: isLoaded ? "1" : "0", height: "100%"
    }

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  useEffect(() => {
    //Get pokemon image
    async function cathPokemon() {
      fetch("https://pokeapi.co/api/v2/pokemon/" + state.pokemonName)
        .then((response) => response.json())
        .then((data) => {
            setState(
                 produce((state) => {
                  state.pokemonObject = data;
                    state.stats.abilities = data.abilities;
                    state.stats.height = data.height;
                    state.stats.weight = data.weight;
                    state.stats.base = data.stats;
                   
                 })
               );

          setPokemonImage(data.sprites.other["official-artwork"].front_default);
        });
    }

    cathPokemon();
  }, [state.pokemonName]);

  return (
    <div className={CSS.main_image}>
        {/* show loader while waiting for image to finish loading */}
      {!isLoaded && <CardSkeleton />}
   
              <img
                src={pokemonImage}
                alt="state.pokemonName"
                onLoad={handleImageLoad}
                style={imageStyle}
              />
  
    </div>
  );
}
