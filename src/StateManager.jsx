import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import ProfileCard from './components/buidls/ProfileCard';
import AnimatedText from './components/buidls/AnimatedText';
import Loaders from './components/buidls/Loaders';



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
    link: 'profilecard'
  }, {
    name: 'Animated Text',
    link: 'animatetext'
  }, {
    name: 'Loaders',
    link: 'loaders'
  }]
 });


  return (
  <>
     <StateContext.Provider value={[state, setState]} className="App">
  
      <Menu />
          <div className='content_section'>
      <Routes>
      
        <Route  index  path="/" element={ <Main />}/>
        <Route  index  path="/profilecard" element={ <ProfileCard />}/>
        <Route  index  path="/animatetext" element={ <AnimatedText />}/>
        <Route  index  path="/loaders" element={ <Loaders />}/>
   
      </Routes>
   </div>
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;