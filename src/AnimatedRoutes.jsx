import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Main from './components/Main';
import Jokes from './components/builds/Jokes/Jokes';
import AnimatedText from './components/builds/animatedText/AnimatedText';
import Loaders from './components/builds/Loaders/Loaders';
import Truthy from './components/builds/Truthy/Truthy';
import FlipsMain from './components/builds/cardFlip/FlipsMain';
import Expand from './components/builds/expandingSections/Expand';
import IntersectionOP from './components/builds/IntersectionOP/IntersectionOP';
import PassGen from './components/builds/passwordGen/PassGen';
import IEMain from './components/builds/incomeExpense/IEMain';
import PokeState from './components/builds/pokemonAPI/PokemonViewer';
import Sortable from './components/builds/sortables/Sortable';
import Filters from './components/builds/filters/Filters';
import CatMain from './components/builds/catAPI/CatMain';
import DatePickerMain from './components/builds/datePickers/DatePickerMain';
import VirtualList from './components/builds/VirtualList/VirtualList';
import LeaderBoardScores from './components/builds/LeaderBoard/LeaderBoardScores';
import DragNDrop from './components/builds/dragAndDrop/DragNDrop';
import EditSection from './components/builds/editSection/EditSection';
import MasonryGrid from './components/builds/MasonryGrid/MasonryGrid';
import ReactFlowDiagrams from './components/builds/ReactFlow/ReactFlowDiagrams';
import DriveLinks from './components/builds/driveLinks/DriveLinks';
import BuildShell from './components/layout/BuildShell';
import { buildRegistry } from './config/builds';

const routeDescriptions = Object.fromEntries(buildRegistry.map((item) => [item.path, item]));

function withShell(path, element) {
  const routeMeta = routeDescriptions[path];

  if (!routeMeta || path === '/') {
    return element;
  }

  return (
    <BuildShell
      title={routeMeta.name}
      description={routeMeta.description}
      accent={routeMeta.accent}
      themeKey={routeMeta.link || "default"}
    >
      {element}
    </BuildShell>
  );
}

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index path="/" element={<Main />} />
        <Route path="/chuckNorris" element={withShell('/chuckNorris', <Jokes />)} />
        <Route path="/animatedText" element={withShell('/animatedText', <AnimatedText />)} />
        <Route path="/loaders" element={withShell('/loaders', <Loaders />)} />
        <Route path="/truthy" element={withShell('/truthy', <Truthy />)} />
        <Route path="/flip" element={withShell('/flip', <FlipsMain />)} />
        <Route path="/expand" element={withShell('/expand', <Expand />)} />
        <Route path="/pokemon" element={withShell('/pokemon', <PokeState />)} />
        <Route path="/sort" element={withShell('/sort', <Sortable />)} />
        <Route path="/passGen" element={withShell('/passGen', <PassGen />)} />
        <Route path="/IOP" element={withShell('/IOP', <IntersectionOP />)} />
        <Route path="/IandE" element={withShell('/IandE', <IEMain />)} />
        <Route path="/cardswap" element={withShell('/cardswap', <DragNDrop />)} />
        <Route path="/editsection" element={withShell('/editsection', <EditSection />)} />
        <Route path="/dndgrid" element={withShell('/dndgrid', <MasonryGrid />)} />
        <Route path="/cat" element={withShell('/cat', <CatMain />)} />
        <Route path="/filters" element={withShell('/filters', <Filters />)} />
        <Route path="/datepickers" element={withShell('/datepickers', <DatePickerMain />)} />
        <Route path="/virtualized" element={withShell('/virtualized', <VirtualList />)} />
        <Route path="/leaderboard" element={withShell('/leaderboard', <LeaderBoardScores />)} />
        <Route path="/reactflow" element={withShell('/reactflow', <ReactFlowDiagrams />)} />
        <Route path="/drivelinks" element={withShell('/drivelinks', <DriveLinks />)} />
      </Routes>
    </AnimatePresence>
  );
}
