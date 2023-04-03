import React from "react";
import Jokes from "./components/builds/Jokes/Jokes";
import AnimatedText from "./components/builds/animatedText/AnimatedText";
import Loaders from "./components/builds/Loaders/Loaders";
import Truthy from "./components/builds/Truthy/Truthy";
import Tile from "./components/tiles/Tile";
import FlipsMain from "./components/builds/cardFlip/FlipsMain";
import Expand from "./components/builds/expandingSections/Expand";
import Pokerball from "./components/builds/pokemonAPI/Pokerball";
import SetUrl from "./components/builds/URLMod/SetUrl";
import GetHTML from "./components/builds/URLMod/GetHTML";
import IntersectionOP from "./components/builds/IntersectionOP/IntersectionOP";
import Button from "./components/builds/buttons/Button";
import Main from "./components/Main";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PassGen from "./components/builds/passwordGen/PassGen";
import IEMain from "./components/builds/incomeExpense/IEMain";
import CatAPI from "./components/builds/catAPI/CatAPI";
import PokeState from "./components/builds/pokemonAPI/PokeState";
import SpriteImages from "./components/builds/pokemonAPI/components/SpriteImages";
import PokemonImage from "./components/builds/pokemonAPI/components/PokemonImage.jsx";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
     
      <Routes location={location} key={location.pathname}>
        {/* Define all routes here. Routes are hidden until navigated to. */}
        <Route  path="/" element={<Main />} />
        <Route  path="/chuckNorris" element={<Jokes />} />
        <Route  path="/animatedText" element={<AnimatedText />} />
        <Route  path="/loaders" element={<Loaders />}/>
        <Route  path="/truthy" element={<Truthy />} />
        <Route  path="/tiles" element={<Tile />} />
        <Route  path="/flip" element={<FlipsMain />} />
        <Route  path="/expand" element={<Expand />} />
        <Route  path="/pokemon" element={<PokeState />}/>
        <Route  path=":id" element={<PokemonImage />} />
         
        {/* <Route  path="/setUrl" element={<SetUrl />} /> */}
        <Route  path="/passGen" element={<PassGen />} />
        <Route  path="/IOP" element={<IntersectionOP />} />
        <Route  path="/IandE" element={<IEMain />} />
        <Route  path="/cat" element={<CatAPI />} />
        {/* <Route  path="/btn" element={<Button />} /> */}



    
     
      </Routes>
    </AnimatePresence>
  );
}
