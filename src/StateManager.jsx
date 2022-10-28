import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import Jokes from './components/builds/Jokes/Jokes';
import AnimatedText from './components/builds/AnimatedText';
import Loaders from './components/builds/Loaders/Loaders';
import ImageHover from './components/builds/ImageEffects/ImageHover';
import Tile from './components/tiles/Tile';



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
     },
     {
       name: "Chuck Norris Jokes",
       link: "chuckNorris",
     },
     {
       name: "Animated Text",
       link: "animatedText",
     },
     {
       name: "Loaders",
       link: "loaders",
     },
     {
       name: "Image:Hover",
       link: "imageEffects",
     },
     {
       name: "Tile Slides",
       link: "tiles",
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
        <Route  index  path="/imageEffects" element={ <ImageHover />}/>
        <Route  index  path="/tiles" element={ <Tile />}/>
   
      </Routes>
   </div>
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;