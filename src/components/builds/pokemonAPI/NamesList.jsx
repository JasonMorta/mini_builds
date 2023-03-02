import React, { useContext, useEffect } from 'react'
import { StateContext } from '../../../StateManager';
import { PokeStateContext } from './PokeState';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import produce from 'immer';
import CSS from './NameList.module.css'
import AllNames from './NameList/PokeNameList.jsx'

export default function NamesList() {

    const value = useContext(PokeStateContext);
    const [state, setState] = value;




    
  return (
    <div className={CSS.names_list}>
 
            
            {state.namesList.map((name) => {
             return  <>
              
             <p >{name.name}</p>
              
              </>
            } )
            
            }
           
     
          
    </div>
  )
}


