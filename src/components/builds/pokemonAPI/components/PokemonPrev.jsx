import React, { useContext, useEffect } from "react";

import CSS from "./PokemonPrev.module.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CardSkeleton from "./CardSkeleton";
import { PokeStateContext } from "../PokeState";
import PokemonMainImage from "./PokemonMainImage";
import Stats from "./Stats";
import NatureStat from "./NatureStat";
import backgroundColors from "./PokemonPrevBGcols.js";

function PokemonPrev(props) {
  const value = useContext(PokeStateContext);
  const [state, setState] = value;
  console.log('state', state)

  let pokiName = state.selectedName;
  let newName = pokiName.split("-"); // Remove hyphens and split the string into an array of words
  let capitalizedNames = newName.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  ); // Capitalize the first letter of each word
  let completeName = capitalizedNames.join(" "); // Join the capitalized words with spaces

  useEffect(() => {
    for (let i = 0; i < backgroundColors.length; i++) {
      if (state.pokemonObject?.types[i].name === backgroundColors[i].name) {
        console.log(backgroundColors[i].name);
        console.log(backgroundColors[i].type);
      }
    }
  }, []);

  let bgCols = {
    backgroundImage: `linear-gradient(to right top, #a890f0,#cd408d, #a8b820)`,
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className={CSS.pokemonPrev_modal} style={bgCols}>
        <h4>{completeName}</h4>
        <PokemonMainImage />
        <NatureStat />
        <Stats />

        {/*close button*/}
        <Button className={CSS.close_modal} onClick={props.onHide}>
          X
        </Button>
      </Modal.Body>
    </Modal>
  );
}

export default PokemonPrev;
