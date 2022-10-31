/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './loaders.css';
import "./sliderAnimations.css";

export default function Loaders() {

  const [currentTime, setCurrentTime ] = useState(0);
  const [loadText, setLoadText] = useState("Loading...")

 let allSlides = []

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

 //build slides
  for (let i = 0; i < 6; i++) {
    allSlides.push(<div 
      key={i}
      className='slide slide-in-left'
      style={{
      animationDuration: `0.7${+ i}s`,
      animationDelay:` 0.${i}s`
    }}
      ></div>) 
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
     <section className='loading-bar'>
       <p>useEffect with setInterval trick</p>
       <h1>{currentTime}%</h1>
       <H3 className='h3Style' >
      {loadText}
       </H3>
     </section>
     <div className='slide-container'>
      {allSlides}
    </div>
    </div>
  )
}
