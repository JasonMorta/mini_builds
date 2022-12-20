import React from 'react'
import Close from './buttons/close/Close'
import "./button.css"
import Dark from './buttons/dark/Dark'


export default function Button() {
  return (
    <div className='btn-grid'>
  <Close />
  <Close />
  <Close />
  <Dark />
 
        
    </div>
  )
}
