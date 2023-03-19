import React, { useContext } from 'react'
import NameList from './components/NameList';
import CSS from "./PokemonStyles.module.css"
import { PokeStateContext } from './PokeState';
import PokemonCard from './PokemonCard';
import PokemonImage from './components/PokemonImage';
import TabsMenu from './components/TabsMenu';




export default function Main() {

  const value = useContext(PokeStateContext);
  const [state, setState] = value;





  return (
    <div className={CSS.main}>
      <div className={CSS.section1}>
      
        <NameList />
        <TabsMenu />
      </div>


      <div className={CSS.section2}>
      <PokemonImage />
      </div>
    </div>
  );
}
