import React from 'react'
import { useState } from 'react';
import "./tiles.css"

export default function Tile() {

 const[tiles, setTiles] = useState(10);
 
 let divs = []
 let inc = 0



  
 for (let i = 0; i < 6; i++) {
  let RN = Math.random().toFixed(2)
    divs.push(<div 
     className='tile'
     style={{
      left: `${0+inc}px`,
      animationDelay: `${RN}s`
     }}

     
     >{tiles}</div>)
     inc+= 105
   }


  return (
    <div className='tile-container'>
    {divs}
   
     <div className='tile-column1'> </div>
     
    
    </div>
  )
}
