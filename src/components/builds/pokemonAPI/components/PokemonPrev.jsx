import React, { useContext } from 'react'

import CSS from './PokemonPrev.module.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CardSkeleton from './CardSkeleton';
import { PokeStateContext } from '../PokeState';
import PokemonMainImage from './PokemonMainImage';
import Stats from './Stats';

function PokemonPrev(props) {

  const value = useContext(PokeStateContext);
  const [state, setState] = value;

  console.log(`%c modal ran`, 'color: #2196f3')
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      >
    
      <Modal.Body      className={CSS.pokemonPrev_modal}  >
        <h4>{state.selectedName.charAt(0).toUpperCase() + state.selectedName.slice(1).replace('.png', '')}</h4>
        <div style={{height:"475px"}}>
        <PokemonMainImage />
        </div>
   
        <Stats />
        <Button className={CSS.close_modal} onClick={props.onHide}>X</Button>


      </Modal.Body>
    </Modal>
  );
}



export default PokemonPrev;