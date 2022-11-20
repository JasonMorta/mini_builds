import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import Jokes from './components/builds/Jokes/Jokes';
import AnimatedText from './components/builds/animatedText/AnimatedText';
import Loaders from './components/builds/Loaders/Loaders';
import Truthy from './components/builds/Truthy/Truthy';
import Tile from './components/tiles/Tile';
import FlipsMain from './components/builds/cardFlip/FlipsMain';



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
       active: false
     },
     {
       name: "Chuck Norris Jokes",
       link: "chuckNorris",
       active: false
     },
     {
       name: "Animated Text",
       link: "animatedText",
       active: false
     },
     {
       name: "Loaders",
       link: "loaders",
       active: false
     },
     {
       name: "Truthy",
       link: "truthy",
       active: false
     },
     {
       name: "Tile Slides",
       link: "tiles",
       active: false
     },
      {
       name: "Flip This",
       link: "flip",
       active: false
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
 });


  return (
  <>
     <StateContext.Provider value={[state, setState]} className="App">
  
      <Menu />
          <div className='content_section'>
      <Routes>
      
        <Route  index  path="/" element={ <Main />}/>
        <Route  index  path="/chuckNorris" element={ <Jokes />}/>
        <Route  index  path="/animatedText" element={ <AnimatedText />}/>
        <Route  index  path="/loaders" element={ <Loaders />}/>
        <Route  index  path="/truthy" element={ <Truthy />}/>
        <Route  index  path="/tiles" element={ <Tile />}/>
        <Route  index  path="/flip" element={ <FlipsMain />}/>
   
      </Routes>
   </div>
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;