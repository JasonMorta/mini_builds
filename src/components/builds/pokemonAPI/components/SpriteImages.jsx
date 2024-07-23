import React, { useContext, useEffect, useState } from "react";
import imageNames from "./imageNames.js";
import CSS from "./ImageLayout.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import produce from "immer";
import { PokeStateContext } from "../PokeState.jsx";
import PokemonPrev from "./PokemonPrev.jsx";

export default function SpriteImages() {
  const [modalShow, setModalShow] = React.useState(false); //Modal state

  const value = useContext(PokeStateContext);
  const [, setState] = value;

  return (
    <div className={CSS.spritGrid}>
      <PokemonPrev show={modalShow} onHide={() => {
        setModalShow(false)
        //clear pokemon stats
        setState(
          produce((state) => {
            state.stats.name = null;
            state.stats.abilities = [];
            state.stats.hp = null;
            state.stats.height = null;
            state.stats.weight = null;
            state.stats.base = [];
            state.stats.current_stat = 0;
          })
        );
        }} />
      {imageNames.map((pokeName, id) => (
        <span className={CSS.pokeSection} key={id}>
          {/* only load images when in view */}
          <LazyLoadImage
            id={`image-${id}`}
            className={CSS.pokeSprite}
            alt={pokeName}
            effect="blur"
            src={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
            onClick={() => {
              /* open modal */
              setState(
                produce((state) => {
                  state.selectedName =
                    pokeName.charAt(0).toLowerCase() +
                    pokeName.slice(1).replace(".png", "");
                  state.pokemonName =
                    pokeName.charAt(0).toLowerCase() +
                    pokeName.slice(1).replace(".png", "");
                })
              );
              setModalShow(true);
            }}
          />

          {/*  Pokemon name */}
          <span className={CSS.pokeName}>
            {pokeName.charAt(0).toUpperCase() +
              pokeName.slice(1).replace(".png", "")}
          </span>
        </span>
      ))}
    </div>
  );
}
