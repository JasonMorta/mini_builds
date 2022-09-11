import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value

 function chooseBuild(e){
  console.log(e)
 }

  return (
    <div className='menu_section'>
     {state.menuItems.map((item, index) =>(
      <h5 className='menu_items' data-name={item} key={index} onClick={chooseBuild}>{item}</h5>
     ))}
    </div>
  ) 
}
