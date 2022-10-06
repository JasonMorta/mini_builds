import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value


  return (
    <div className='menu_section'>
     {state.menuItems.map((item, index) =>(
      <h1>{item}</h1>
     ))}
    </div>
  )
}