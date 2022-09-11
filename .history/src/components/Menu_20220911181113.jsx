import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value

 function chooseBuild(e){
  console.log(e.target.dataset.mini)
 }

  return (
    <div className='menu_section'>
     {state.menuItems.map((item, index) =>(
      <h5 className='menu_items' data-mini={item} key={index} onClick={chooseBuild}>{item}</h5>
     ))}
    </div>
  ) 
}
