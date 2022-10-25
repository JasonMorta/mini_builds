/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './loaders.css';

export default function Loaders() {

 const [currentTime, setCurrentTime ] = useState(0);
 const [loadText, setLoadText] = useState("Loading...")
const [divEl, setDivEl] = useState(["3", "l"])


let allSlides = divEl.map(i => <div className='slide'>{i}</div>)

//
 const progress = ()=>{
  //Stop when bar is full 
  if (currentTime !== 100){ 
   setCurrentTime(state => state + 1)
  }

  //Change text when full
  if (currentTime === 100){
   setLoadText("Completed")
  }
 }
 
 //Increment every 20ns
  useEffect(() => {

   const timer = setInterval( progress, 20 );
   return () => clearInterval(timer);
 }, [progress] );

//Use styled-components package to access the ::before attribute
 const H3 = styled.h3`
  font-weight: bold;
  &:before {
   width: ${currentTime}%
 }
`;






  return (
    <div>
     <p>useEffect with setInterval trick</p>
     <h1>{currentTime}%</h1>
     <H3 className='h3Style' >
    {loadText}
     </H3>
     {allSlides}
    </div>
  )
}
