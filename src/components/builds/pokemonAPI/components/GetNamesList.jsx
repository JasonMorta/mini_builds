import React, { useContext, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { PokeStateContext } from '../PokeState';
import produce from 'immer';


export default function GetNamesList() {
    const value = useContext(PokeStateContext);
    const [state, setState] = value;


    useEffect(() => {
      async function fetchData() {
        console.time("myFunction");
        await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0")
          .then((response) => response.json())
          .then((data) => {
            //use data here
            setState(
              produce((state) => {
                state.namesList = data.results
                              
              })
            );
            console.log("state: ", state);
          })
          .catch((error) => console.error(error));
      }

      //setT the default pokemon name
        setState(
            produce((state) => {
              state.pokemonName = state.selectedName
            })
          );


      fetchData();
      console.log(`%cGot all the name`, `color: pink`)
      console.timeEnd("myFunction");
       
    }, []);
 



  return (
    <div style={{padding: "10px", marginTop: "5px"}}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
      <Skeleton />
      <Skeleton animation="wave" />
    </div>
  );
}
