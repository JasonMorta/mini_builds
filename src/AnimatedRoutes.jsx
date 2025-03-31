import React from "react";
import Jokes from "./components/builds/Jokes/Jokes";
import AnimatedText from "./components/builds/animatedText/AnimatedText";
import Loaders from "./components/builds/Loaders/Loaders";
import Truthy from "./components/builds/Truthy/Truthy";

import FlipsMain from "./components/builds/cardFlip/FlipsMain";
import Expand from "./components/builds/expandingSections/Expand";
import IntersectionOP from "./components/builds/IntersectionOP/IntersectionOP";
import Main from "./components/Main";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PassGen from "./components/builds/passwordGen/PassGen";
import IEMain from "./components/builds/incomeExpense/IEMain";
import PokeState from "./components/builds/pokemonAPI/PokeState";
import Sortable from "./components/builds/sortables/Sortable";
import Filters from "./components/builds/filters/Filters.jsx";
import CatMain from "./components/builds/catAPI/CatMain.jsx";
import DatePickerMain from "./components/builds/datePickers/DatePickerMain.jsx";
import VirtualList from "./components/builds/VirtualList/VirtualList.jsx";
import LeaderBoardScores from "./components/builds/LeaderBoard/LeaderBoardScores.jsx";
import DragNDrop from "./components/builds/dragAndDrop/DragNDrop.jsx";
import EditSection from "./components/builds/editSection/EditSection.jsx";
import MasonryGrid from "./components/builds/MasonryGrid/MasonryGrid.jsx";


export default function AnimatedRoutes() {
  const location = useLocation();
  console.log('location', location)
  console.log(`%c AnimatedRoutes`, "color: red");

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        {/* Define all routes here. Routes are hidden until navigated to. */}
        <Route index path="/" element={<Main />} />
        <Route path="/chuckNorris" element={<Jokes />} />
        <Route path="/animatedText" element={<AnimatedText />} />
        <Route path="/loaders" element={<Loaders />} />
        <Route path="/truthy" element={<Truthy />} />
        <Route path="/flip" element={<FlipsMain />} />
        <Route path="/expand" element={<Expand />} />
        <Route path="/pokemon" element={<PokeState />}/>
        <Route path="/sort" element={<Sortable />} />
        <Route path="/passGen" element={<PassGen />} />
        <Route path="/IOP" element={<IntersectionOP />} />
        <Route path="/IandE" element={<IEMain />} />
        <Route path="/cardswap" element={<DragNDrop />} />
        <Route path="/editsection" element={<EditSection />} />
        <Route path="/dndgrid" element={<MasonryGrid />} />
        <Route path="/cat" element={<CatMain /> } />
        <Route path="/filters" element={<Filters />} />
        <Route path="/datepickers" element={<DatePickerMain /> } />
        <Route path="/virtualized" element={<VirtualList />} />
        <Route path="/leaderboard" element={<LeaderBoardScores />} />
        {/* <Route path="/swappy" element={<Swappy />} /> */}
      </Routes>
    </AnimatePresence>
  );
}
