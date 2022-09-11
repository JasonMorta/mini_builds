import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Preview from './components/Preview';



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const StateContext = createContext();

//All children will run through the state manger.
function StateManager() {

 const [state, setState] = useState({
  menuItems: ['Profile Card', 'Animate Text' ]
 });


  return (
  <>
     <StateContext.Provider value={[state, setState]} className="App">
      
      <Menu />
      <Preview />
     
      </StateContext.Provider>
  </>
  )
}
export default StateManager;