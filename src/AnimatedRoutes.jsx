import React from 'react'
import Jokes from './components/builds/Jokes/Jokes';
import AnimatedText from './components/builds/animatedText/AnimatedText';
import Loaders from './components/builds/Loaders/Loaders';
import Truthy from './components/builds/Truthy/Truthy';
import Tile from './components/tiles/Tile';
import FlipsMain from './components/builds/cardFlip/FlipsMain';
import Expand from './components/builds/expandingSections/Expand';
import Pokerball from './components/builds/pokemonAPI/Pokerball';
import SetUrl from './components/builds/URLMod/SetUrl';
import GetHTML from './components/builds/URLMod/GetHTML';
import IntersectionOP from './components/builds/IntersectionOP/IntersectionOP';
import Button from './components/builds/buttons/Button';
import Main from './components/Main';
import { Route, Routes, useLocation,  } from "react-router-dom";
import {AnimatePresence} from 'framer-motion'
import PassGen from './components/builds/passwordGen/PassGen';
import IandE from './components/builds/incomeExpense/IandE';

export default function AnimatedRoutes() {

  const location = useLocation();
  
  return (
<AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<Main />} />
        <Route index path="/chuckNorris" element={<Jokes />} />
        <Route index path="/animatedText" element={<AnimatedText />} />
        <Route index path="/loaders" element={<Loaders />} />
        <Route index path="/truthy" element={<Truthy />} />
        <Route index path="/tiles" element={<Tile />} />
        <Route index path="/flip" element={<FlipsMain />} />
        <Route index path="/expand" element={<Expand />} />
        <Route index path="/pokemon" element={<Pokerball />} />
        {/* <Route index path="/setUrl" element={<SetUrl />} /> */}
        <Route index path="/passGen" element={<PassGen />} />
        <Route index path="/IOP" element={<IntersectionOP />} />
        <Route index path="/IandE" element={<IandE />} />
        {/* <Route index path="/btn" element={<Button />} /> */}
      </Routes>
</AnimatePresence>
  );
}
