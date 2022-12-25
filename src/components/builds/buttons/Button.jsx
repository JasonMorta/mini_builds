import React from 'react'
import Close from './buttons/close/Close'
import "./button.css"
import Dark from './buttons/dark/Dark'
import BsButton from '../BsButton'


export default function Button() {

  function handleClick(){

  }

  return (
    <div className='btn-grid'>
  <Close />
  <Close />
    <div>
      <BsButton  
      style={{margin: "auto"}}
      className="my_btn"
      variant="warning"
      onClick={handleClick}
      text="Warning"
        />
    </div>
  <Dark />
 
        
    </div>
  )
}
