import React, { useContext } from 'react'
import NameList from './components/NameList';
import CSS from "./PokemonStyles.module.css"
import { PokeStateContext } from './PokeState';
import PokemonCard from './PokemonCard';
import PokemonImage from './components/PokemonImage';
import TabsMenu from './components/TabsMenu';
import SpriteImages from './components/SpriteImages';




export default function Main() {

  const value = useContext(PokeStateContext);
  const [state, setState] = value;





  return (
    <div className={CSS.main}>
      <div className={CSS.section1}>
      
        {/* <NameList /> */}
       <SpriteImages />
      </div>


      <div className={CSS.section2}>
      {/* <PokemonImage /> */}
      {/* <TabsMenu /> */}
      </div>
    </div>
  );
}
