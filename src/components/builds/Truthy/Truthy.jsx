import React from 'react';
import { useState } from 'react';
import Boxes from "./Box"
import Box from './Box';
import BoxAware from './BoxAware';

export default function ImageHover() {

  const [array, setArray] = useState([{id: 1, on: true },{id: 2,on: false},{id: 3,on: false,}]);


  //toggle unaware boxes
  function toggle(id){
    setArray(prev => prev.map(item => item.id === id ? {...item, on: !item.on}: item ))
  }

  //toggle aware boxes
  function boxAware(on){
    console.log(array);
  
      setArray(prev => prev.map(item => 
        item.on === on ?
        ({...item, on: !prev.on})
        :
        ({...item, on: !item.on})
        ))
    
  
  }

  //These two boxes flip's the values on click
  let unaware = array.map((bx, i) =>(
    <Box 
      key={i}
      context={bx.on.toString()}
      toggle={()=> toggle(bx.id)} />
  )) 

  let aware = array.map((val, idx) => (
    <BoxAware 
      key={idx}
      handleClick={()=> boxAware(val.id)}
      context={val.on.toString() +" "+ val.id} />
  ))





  return (
    <div className='truth-container'>
      <h1>Unaware boxes</h1>
      <div className='boxes'>
        {unaware}
        </div>

        <h1>Aware boxes</h1>
      <div className='boxes'>
      {aware}
      </div>
    </div>
  )
}
