/* eslint-disable no-lone-blocks */
/* eslint-disable no-undef */
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
import { StateContext } from '../../../StateManager';
import'./cardStyle.css'
import './poke.css'
import CardSkeleton from './CardSkeleton';
import styled from "styled-components";

export default function MonsterCard(props) {

    const value = useContext(StateContext);
    const [state, setState] = value;
    const [inputVal, setInputVal] = useState("")
    const [update, setUpdate] = useState(false)
    const [moreNames, setMoreNames] = useState({})
    const [pokeData, setPokeData] = useState({})
    const [nameManipulate, setNameManipulate] = useState()

    const PI = styled.div`

    border: 1px solid black;

    &::before {
      content: "Type: ${pokeData.name ? pokeData.types[0].type.name : "" }";
      position: absolute;
      font-weight: 600;
      right: 65px;
      top: -10px;
      background-color: #ebebeb;
    }
    &::after {
      content: "Full name: ${pokeData.name ? pokeData.name : "Hello "}";
      position: absolute;
      font-weight: 600;
      left: 0px;
      border-radius: 3px;
      top: -10px;
      background-color: #ebebeb;
    }
 
    `


//get pokemon names
useEffect(() => {

  let getPokemonNames = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const results = await response.json();
        setMoreNames(results);
        setNameManipulate(results.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()
  };

  getPokemonNames()
  

}, []);

    

    function enterBtn(event){
        if (event.key === "Enter") {
            event.preventDefault();
            setState(prev => ({...prev, pokemonName: inputVal}))
            cathPokemon()
          }
    }

    function onInputField(e){
           setInputVal(e.target.value)
    }


    useEffect(() => {
      //Get all pokemon image
    const  cathPokemon = async () => {     
        try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+state.pokemonName.toLowerCase());
        const results = await response.json();
        setTimeout(() => {
          setPokeData(results)
        console.log('results', results)
        }, 1000);
      } catch (error){
        console.log("error", error);
      }
    
    }

    cathPokemon()
    }, [state])
    

    //sort names from A-Z
    function sortNames() {
      nameManipulate.sort((a, b) => {
        let az = a.name.toLowerCase(),
            za = b.name.toLowerCase();
        if (az < za) {
            return -1;
        }
        if (za > az) {
            return 1;
        }
        return 0;
    })
    //rerender components
    setUpdate(prev => !prev)
    }

     //sort names from Z-A
    function sortNamez(){
      nameManipulate.sort((b, a) => {
        let az = a.name.toLowerCase(),
            za = b.name.toLowerCase();
        if (az < za) {
            return -1;
        }
        if (za > az) {
            return 1;
        }
        return 0;
    })
    //rerender components
    setUpdate(prev => !prev)
    }

 
  return (
    <div className="pokemonAPI">
      <h4>Search for pokemon</h4>
      {/* search input */}
      <InputGroup className="mb-1" style={{ width: " 50%", margin: "auto" }}>
        <Form.Control
          type="text"
          placeholder="Enter Pokemon Name"
          aria-label="Enter Pokemon Name"
          aria-describedby="basic-addon2"
          defaultValue={state.pokemonName}
          onChange={onInputField}
          onKeyDown={enterBtn}
        />
        {/* <Button 
            variant="danger" 
            id="button-addon2"
            onClick={cathPokemon}
            >
          GET
        </Button> */}
      </InputGroup>

      {/* CARD image */}

      <div className="card-outer">
        {pokeData.name ? (
          <>
            <div className="pokeCard-container">
            <p className="poki-name">{pokeData.species.name.toUpperCase()}</p>
              <img
                className="fade-in-top pokeImage"
                src={pokeData.sprites.other["official-artwork"].front_default}
                alt={pokeData.name + " image"}
              />

              <PI className="pokemon-info">
                <p style={{ width: "100%" }}>#{pokeData.id}</p>
               
                <div className="abilities">
                  {pokeData.abilities.map((skill, i) => (
                    <p key={i} className="power">
                      {skill.ability.name.replace("-", " ")}
                    </p>
                  ))}
                </div>

                <div className="pokemon-info2">
                  <p>HP: <b>{pokeData.stats[0].base_stat}</b></p>
                  <p>Height: <b>{(pokeData.height * 0.1).toFixed(1)}m</b></p>
                  <p>Wight: <b>{(pokeData.weight * 0.1).toFixed(1)}kg</b></p>
                </div>
            
            </PI>
            </div>
          </>
        ) : (
          <CardSkeleton />
        )}
        <div className="moreNames">
          <h3>Select a Pokemon</h3>
          {typeof moreNames.results === "object" ? (
            <p style={{ margin: "0" }}>{moreNames.results.length} Pokemon</p>
          ) : (
            <></>
          )}
          <ul>
            {typeof moreNames.results === "object" ? (
              moreNames.results.sort().map((i, index) => (
                <>
                  {/* name list */}
                  <li
                    key={index}
                    onClick={(e) => {
                      pokeData.name = undefined
                      console.log(e.target.innerText);
                      setState((prev) => ({
                        ...prev,
                        pokemonName: e.target.innerText,
                      }));

                      e.target.style.fontWeight = 900;
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {i.name}
                  </li>
                </>
              ))
            ) : (
              <></>
            )}
          </ul>
          <div className="poki_btns">
            <button
              type="button"
              onClick={sortNames}
              className="btn btn-primary"
            >
              Sort A-Z
            </button>
            <button
              type="button"
              onClick={sortNamez}
              className="btn btn-primary"
            >
              Sort Z-A
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
