import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function BootCampList(props) {

    
    

    let list =   props.boots.map((boot, idx)=>(
        <Dropdown.Item 
        key={idx} 
        onClick={props.handleSelect}
        >{boot}
        </Dropdown.Item>
    ))


   
  return (
<>
        <Dropdown>
        <Dropdown.Toggle 
            variant="success" 
            id="dropdown-basic"
            
            >
          {props.list}
        </Dropdown.Toggle>
    
        <Dropdown.Menu>
        {list}
        </Dropdown.Menu>
      </Dropdown>
</>
  )
}
