/* eslint-disable no-self-compare */
/* eslint-disable no-cond-assign */
import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';
import { Link } from "react-router-dom";

export default function Menu() {

console.log(`%c Main state`, 'color: #2196f3')
 const value = useContext(StateContext)

 let [state, setState] = value

function active(i) {
  let data = state; // save state to variable

  //Change all object active values to: false => every time => first
  data.menuItems.forEach((item) => (item.active = false));

  //Only set selected, active value to true
  data.menuItems[i].active = true;

  //spread in modified variable into state.
  setState((prev) => ({ ...prev, data }));
}

  return (
    <div className="menu_section">
      {state.menuItems.map((item, i) => (
        <Link
          data-mini={item.name}
          key={i}
          onClick={() => {
            active(i);
          }}
          to={`/${item.link}`}
          className={`menu_items ${item.active ? " active_build" : ""}`}
        >
          {item.name}
        </Link>
      ))}
    </div>
  ); 
}
