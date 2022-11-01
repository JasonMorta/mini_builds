import React, { useState } from 'react';
import Box from './Box';
import BoxAware from './BoxAware';

export default function ImageHover() {
  

  const [array, setArray] = useState([{id: 1, on: true },{id: 2,on: false},{id: 3,on: false,}]);

  //toggle unaware boxes
  function toggle(id){
    setArray(prev => prev.map(item => item.id === id ? {...item, on: !item.on}: item ))
  }






  //toggle aware boxes
  function boxAware(id, on){

        if (on) {
          setArray(prev => prev.map(x => ({...x, on:true})))//first set all on: false
          setArray(prev => prev.map(x => x.id === id ? ({...x, on:!x.on}): x))//only flip selected on

        } else {
          setArray(prev => prev.map(x => ({...x, on:false})))
          setArray(prev => prev.map(x => x.id === id ? ({...x, on:!x.on}): x))

        }

      
  }
    

       


  
  //These two boxes flip's the values on click
  let unaware = array.map((bx, i) =>(
    <Box 
    key={i}
    textColor={bx.on ? "#03a9f4": "#ff5722"}
    handleClick={()=> toggle(bx.id, bx.on)}
    context={bx.on.toString()} />
  )) 

  let aware = array.map((val, idx) => (
    <BoxAware 
      key={idx}
      textColor={val.on ? "green": "red"}
      handleClick={()=> boxAware(val.id, val.on)}
      context={val.on.toString()} />
  ))





  return (
    <div className='truth-container'>
      <h1>Unaware boxes</h1>
      <div className='boxes'>
        {unaware}
        </div>
        <p>Flip the selected truthy only</p>
        <h1>Aware boxes</h1>
      <div className='boxes'>
      {aware}
      </div>
      <p>Flip the selected truthy and flip the two remaining to opposite</p>
    </div>
  )
}
