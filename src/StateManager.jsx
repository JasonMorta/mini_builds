import React, { createContext, useState } from "react";
import Menu from "./components/Menu";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

import AnimatedRoutes from "./AnimatedRoutes";

//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const StateContext = createContext();

//All children will run through the state manger.
function StateManager() {
  const [state, setState] = useState({
    menuItems: [
      {
        name: "Home",
        link: "",
        active: true,
      },
      {
        name: "Chuck Norris Jokes",
        link: "chuckNorris",
        active: false,
      },
      {
        name: "Animated Text",
        link: "animatedText",
        active: false,
      },
      {
        name: "Loaders",
        link: "loaders",
        active: false,
      },
      {
        name: "Truthy",
        link: "truthy",
        active: false,
      },
      {
        name: "Tile Slides",
        link: "tiles",
        active: false,
      },
      {
        name: "Flip This",
        link: "flip",
        active: false,
      },
      {
        name: "Expanded",
        link: "expand",
        active: false,
      },
      {
        name: "Pokemon-API",
        link: "pokemon",
        active: false,
      },
      {
        name: "Password Gen",
        link: "passGen",
        active: false,
      },
      {
        name: "I & E",
        link: "IandE",
        active: false,
      },
      {
        name: "RIO API",
        link: "IOP",
        active: false,
      },
      {
        name: "Kitty API",
        link: "cat",
        active: false,
      },
    ],
    nextJoke: false,
    catagories: [
      "none",
      "animal",
      "career",
      "celebrity",
      "dev",
      "explicit",
      "fashion",
      "food",
      "history",
      "money",
      "movie",
      "music",
      "political",
      "religion",
      "science",
      "sport",
      "travel",
    ],
    activeCat: "none",
    score: 0,
    pokemonName: "mewtwo-mega-y",
    pokeData: {},
    //Page animations
    motion: {
      initial: { opacity: 0, width: "100%" },
      animate: {
        "-webkit-animation":
          "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        animation:
          "slide-in-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
      },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
    passGen: {
      count: 5,
      upperCase: true,
      lowerCase: true,
      symbols: true,
      numbers: true,
      pass: "",
    },
    catImage: [],
  });

  return (
    <>
      <StateContext.Provider value={[state, setState]} className="App">
        <Router>
          <Menu />
          <div className="content_section">
            <AnimatedRoutes />
          </div>
        </Router>
      </StateContext.Provider>
    </>
  );
}
export default StateManager;
