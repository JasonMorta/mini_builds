import React from 'react';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function FontDrop_down(props) {

  const [animationClass, setAnimationClass] = useState(
    [
      "text-pop-up-top",
      "tracking-in-contract-bck-top",
      "text-focus-in",
      "focus-in-expand",
      "roll-in-blurred-left"
    ])

  const animista = animationClass.map((anami, index)=>(
    <Dropdown.Item 
      key={index}
      onClick={props.handleClick}
      >{anami}
    </Dropdown.Item>
  ))

  return (
      <>
         <DropdownButton 
          id="dropdown-basic-button" 
          title={props.title}>
          {animista}
        </DropdownButton>
      </>
  )
}
