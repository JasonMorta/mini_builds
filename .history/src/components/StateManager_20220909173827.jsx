import React, { createContext, useState } from 'react'



//create context hook
//This hook allow any nested children to share and alter data with the use of props.
export const state = createContext();


export default function StateManager() {

 const [state, setState] = useState({
  menuItems: ['Temperature Converter']
 });


  return (
   <state.Provider value={[state, setState]} className="App">
    <>

    </>
    </state.Provider>
  )
}
