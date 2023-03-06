import React, { useContext, useEffect } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { PokeStateContext } from './PokeState';
import produce from 'immer';

export default function GetNamesList() {
    const value = useContext(PokeStateContext);
    const [state, setState] = value;


    useEffect(() => {

          fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            .then(response => response.json())
        .then(data => {
            console.count("GetNamesList");
              setState(
                  produce((state) => {
                    state.namesList = data.results;
                  })
                );
        });
    }, [])
    



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
