import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Main from './components/Main';
import { Routes, Route } from 'react-router-dom';
import ProfileCard from './components/buidls/ProfileCard';



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const StateContext = createContext();

//All children will run through the state manger.
function StateManager() {

 const [state, setState] = useState({
  menuItems: [
    {
      name: 'Home',
      link: ''
    },{
    name: 'Profile Card',
    link: 'profilecard'
  }, {
    name: 'Animate Text',
    link: 'animatetext'
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
   
      </Routes>
   </div>
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;