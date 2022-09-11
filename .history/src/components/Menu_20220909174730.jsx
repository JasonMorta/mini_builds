import React, { useContext } from 'react';
import { state } from '../StateManager';
import './menu.css';

export default function Menu() {


 const data = useContext(state);


  return (
    <div className='menu_section'>
     <h1>menu section</h1>
    </div>
  )
}
