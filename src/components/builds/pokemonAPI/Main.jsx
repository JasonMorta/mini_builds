import React, { useContext } from 'react'

import NamesList from './NamesList'
import CSS from "./PokemonStyles.module.css"
import { PokeStateContext } from './PokeState';
import SearchField from './SearchField';


export default function Main() {

  const value = useContext(PokeStateContext);
    const [state, setState] = value;





  return (
    <div className={CSS.main}>
      <div className={CSS.section1}>
    
       
        <NamesList />
      </div>


      <div className={CSS.section2}>Main</div>
    </div>
  );
}
