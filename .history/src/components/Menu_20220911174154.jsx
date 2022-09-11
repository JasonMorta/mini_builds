import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value

console.log(state)
  return (
    <div className='menu_section'>
     <h1>menu section</h1>
    </div>
  )
}
