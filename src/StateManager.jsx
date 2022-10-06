import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import ProfileCard from './components/builds/ProfileCard';
import AnimatedText from './components/builds/AnimatedText';
import Loaders from './components/builds/Loaders/Loaders';
import ImageHover from './components/builds/ImageEffects/ImageHover';



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const StateContext = createContext();

//All children will run through the state manger.
function StateManager() {

 const [state, setState] = useState({
  menuItems: [{
    name: 'Home',
    link: ''
  }, {
    name: 'Profile Card',
    link: 'profileCard'
  }, {
    name: 'Animated Text',
    link: 'animatedText'
  }, {
    name: 'Loaders',
    link: 'loaders'
  }
  , {
    name: 'Image:Hover',
    link: 'imageEffects'
  }]
 });


  return (
  <>
     <StateContext.Provider value={[state, setState]} className="App">
  
      <Menu />
          <div className='content_section'>
      <Routes>
      
        <Route  index  path="/" element={ <Main />}/>
        <Route  index  path="/profileCard" element={ <ProfileCard />}/>
        <Route  index  path="/animatedText" element={ <AnimatedText />}/>
        <Route  index  path="/loaders" element={ <Loaders />}/>
        <Route  index  path="/imageEffects" element={ <ImageHover />}/>
   
      </Routes>
   </div>
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;