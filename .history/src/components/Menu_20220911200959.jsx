import React, { useContext } from 'react';
import { StateContext } from '../StateManager';
import './menu.css';
import { Link } from "react-router-dom";

export default function Menu() {


 const value = useContext(StateContext)

 let [state, setState] = value

 function chooseBuild(e){
  console.log(e.target.dataset.mini)
 }

  return (
    
    <div className='menu_section'>
     {state.menuItems.map((item, index) =>(
      <Link 
      data-mini={item.name}
      key={index} 
      onClick={chooseBuild}
      to={`/${item.link}`}
      className="menu_items"
      >{item.name}
      </Link>
  
     ))}
    </div>
  ) 
}
