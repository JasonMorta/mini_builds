import React, { useContext, useEffect } from 'react'
import { StateContext } from '../../../StateManager';
import { PokeStateContext } from './PokeState';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import produce from 'immer';
import CSS from './NameList.module.css'

export default function NamesList() {

    const value = useContext(PokeStateContext);
    const [state, setState] = value;

    //Get all pokemon names as add to state
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
          .then(response => response.json())
          .then(data =>   {

              setState(
                  produce((state) => {
                    state.namesList = data.results;
                  })
                );
      
            // const allNames = produce(state, draftSate => {
              
            //     data.results.forEach(({ name }) => {
            //         draftSate.namesList.push(name);
            //     });
            //   });

            console.log(state);
   
        }
              );
             


    }, [])


    
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


