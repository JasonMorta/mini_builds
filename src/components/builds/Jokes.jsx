/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import "./Jokes.css";
import placeH from '../../static/images/imagePlaceHolder.png'
import { useState } from 'react';
import BS_Button from './BS_Button';
import { useEffect } from 'react';


export default function Jokes() {

  const [joke, setJoke] = useState(["1", "2", "3"])
  const [count, setCount] = useState([])

function getJokes(){
  fetch("https://api.chucknorris.io/jokes/random")
  .then((res) => res.json())
  .then((result) => {
    console.log('result', result.value)
    console.log('result', result)
    setCount(result.value)
  })
}

for (let i = 0; i < 3; i++) {
 getJokes()
}


  let output = joke.map((chuck, idx) =>(
    <div className="card" key={idx}>
    <div className="cardImage">
     <img src={placeH} alt="Avatar" />
    </div>
    <div className="container">
     <h2><b>John Doe{chuck}</b></h2>
     <p>Lorem ipsum dolor sit</p>
     <ul>
      <li>Lorem ipsum dolor sit</li>
      <li>Lorem ipsum dolor sit</li>
      <li>Lorem ipsum dolor sit</li>
   
     </ul>
   
    </div>
   </div>
  )) 



  return (
  <section >
  <div className='chuck-jokes'>
    {output}
   
  </div>
  <BS_Button 
          handleClick={getJokes}
          className={"new-joke-btn"}
          text={"Next Joke"}
          variant={"danger"} />
  </section>
  )
}
