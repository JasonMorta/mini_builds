/* eslint-disable react-hooks/exhaustive-deps */
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



useEffect(() => {

  //loads 3 jokes on page  load
  for (let i = 0; i < 3; i++) {
    fetch("https://api.chucknorris.io/jokes/random")
    .then((res) => res.json())
    .then((result) => {
    // console.log('result', result.value)
      //console.log('result', result)
      //setCount(result.value)
      // for (let i = 0; i < count.length; i++) {
         setCount(prev => [...prev, result.value])
      //  }
      console.log(count);
    })
   }
}, [])

const [num, setNum] = useState(0)

function getJokes(){
  fetch("https://api.chucknorris.io/jokes/random")
  .then((res) => res.json())
  .then((result) => {
    setNum(0)

  //  while (num < 3) {
    setCount(prev => [...prev, result.value])
    setNum(prev => prev + 1)
    console.log(num);
  //  }
    //console.log(count);
 
  })
}


  let output = joke.map((chuck, idx) =>(
    <div className="card" key={idx}>
    <div className="cardImage">
     <img src={placeH} alt="Avatar" />
    </div>
    <div className="container">
     <h2><b>John Doe{chuck}</b></h2>
     <p>{count[idx]}</p>

   
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
