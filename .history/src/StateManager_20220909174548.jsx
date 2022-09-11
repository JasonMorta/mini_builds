import React, { createContext, useState } from 'react'
import Menu from './components/Menu';
import Preview from './components/Preview';



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const state = createContext();

//All children will run through the state manger.
function StateManager() {

 const [state, setState] = useState({
  menuItems: ['Temperature Converter']
 });


  return (
  <>
     <state.Provider value={[state, setState]} className="App">
      
      <Menu />
      <Preview />
     
      </state.Provider>
  </>
  )
}
export default StateManager;