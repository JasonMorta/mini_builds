/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import chuckie from "./pics/chuck.png";
import React, { useContext } from 'react';
import "./Jokes.css";
import { useState, useEffect } from 'react';
import BS_Button from '../BS_Button';
import FetchJoke from './FetchJoke';
import { StateContext } from '../../../StateManager';
import Category from './Category';


export default function Jokes() {

const value = useContext(StateContext);

let [state, setState] = value

  return (
  <section  >
    <img src={chuckie} width={300} className="chuck slide-in-blurred-top" alt="chuck" />
  <div className='chuck-jokes'>

    <FetchJoke />
    <div className='divider'></div>
    <FetchJoke />
    <div className='divider'></div>
    <FetchJoke />

  </div>
  
  <BS_Button 
          handleClick={()=> setState(prev => ({...prev, nextJoke: !state.nextJoke})) }
          className={"new-joke-btn"}
          text={"Next Joke"}
          variant={"danger"} />

          <Category />
  </section>
  )
}
