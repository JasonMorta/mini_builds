import React, { useState } from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { StateContext } from '../../../StateManager';

export default function FetchJoke(props) {
  const [joke, setJoke] = useState(false)

  const value = useContext(StateContext);

  const [state, setState] = value

  
useEffect(() => {
//fetch random jokes if category is === "none"
  state.activeCat === "none" ?
  fetch("https://api.chucknorris.io/jokes/random")
  .then(response => response.json())
  .then(data => setJoke(data.value)) 
  :
  fetch(`https://api.chucknorris.io/jokes/random?category=${state.activeCat}`)
    .then(response => response.json())
    .then(data => setJoke(data.value));

}, [state])


  return (
    <div>
      <h4>{joke }</h4>
    </div>
  )
}
