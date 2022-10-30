import React from 'react'
import { useContext, useEffect } from 'react'
import { StateContext } from '../../../StateManager';
import Dropdown from 'react-bootstrap/Dropdown';

export default function Category() {

  const value = useContext(StateContext);

  const [state, setState] = value;
  //console.log('state', state)
useEffect(() => {
  setState(prev => ({...prev, activeCat: "none"}))
}, [])


  return (
    <Dropdown>
    <Dropdown.Toggle variant="success" id="dropdown-basic">
      {state.activeCat === "none" ? "Category": state.activeCat}
    </Dropdown.Toggle>

    <Dropdown.Menu>
      {state.catagories.map((cat, i) => (
        <Dropdown.Item 
        key={i}
        onClick={()=> {
          setState(prev => ({...prev, activeCat: cat}))
          console.log(cat);
        }}>{cat}</Dropdown.Item>
      ))}
   
    </Dropdown.Menu>
  </Dropdown>
  )
}
