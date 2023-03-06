import React, { useContext, useEffect, useRef, useState } from 'react'
import { StateContext } from '../../../StateManager';
import { PokeStateContext } from './PokeState';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import produce from 'immer';
import CSS from './NameList.module.css'
import GetNamesList from './GetNamesList';
import TextField from '@mui/material/TextField';

export default function NamesList() {

    const value = useContext(PokeStateContext);
    const [inputValue, setInputValue] = useState("")
    const [state, setState] = value;

  
    const inputRef = useRef()


function handleClick(name) {
  setInputValue(name)
}

function handleKey(e) {
  console.log(e.target.value);
}

    
  return (
    <>
       <section style={{margin: "10px"}} >
        <TextField

            hiddenLabel
            ref={inputRef}
            //label={"🔎"}
            onKeyDown={handleKey}
            id="filled-hidden-label-small"
            value={inputValue}
            variant="filled"
            size="small"
        />
    </section>
    <h2 style={{ width: "100%", textAlign: "initial", marginLeft: "10%" }}>
          Choose name
        </h2>
      <div className={CSS.names_list}>
        {state.namesList.length === 0 ? <GetNamesList /> : state.namesList.map((name, i) => {
          return (
            <>
              <p key={i} onClick={()=>handleClick(name.name)}>{name.name}</p>
            </>
          );
        })}
      </div>
    </>
  );
}


