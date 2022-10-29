/* eslint-disable no-cond-assign */
import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';
import { Link } from "react-router-dom";

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value



  return (
    
    <div className='menu_section'>
     {state.menuItems.map((item, index) =>(
      <Link 
      data-mini={item.name}
      key={index} 
      onClick={()=> {
        setState(i => ({...i, active: state.menuItems.map((x, i) => x.active = !x.active)}))
        console.log(item.active);
      }}
      to={`/${item.link}`}
      className={`menu_items ${item.active ? " active_build": ""}`}
      >
        {item.name}
      </Link>
  
     ))}
    </div>
  ) 
}
