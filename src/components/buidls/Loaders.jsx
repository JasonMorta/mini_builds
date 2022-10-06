/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import './loaders.css';

export default function Loaders() {
 const [ currentTime, setCurrentTime ] = useState(0);
 const [loadText, setLoadText] = useState("Loading...")


 const tick = ()=>{
  if (currentTime !== 100){ 
   setCurrentTime(state => state + 1)
  }
  
  if (currentTime === 100){
   setLoadText("Completed")
  }
 }
 
  useEffect(() => {
   const timer = setInterval( tick, 20 );
   return () => clearInterval(timer);
 }, [tick] );


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
    </div>
  )
}
