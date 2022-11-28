import React from 'react'
import { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

export default function MonsterCard() {

    const [name, setName] = useState("")
    console.log(name);

    function cathPokemon(e){
            
    }

  return (
    <div>
        <br/>
        <h4>Search for pokemon</h4>
        
      <InputGroup className="mb-1" style={{width:" 50%", margin: "auto"}}>
        <Form.Control
          placeholder="Enter Pokemon Name"
          aria-label="Enter Pokemon Name"
          aria-describedby="basic-addon2"
          defaultValue={name}
          onInput={(e)=> setName(e.target.value)}
        />
        <Button 
            variant="danger" 
            id="button-addon2"
            onClick={cathPokemon}
            >
          Button
        </Button>
      </InputGroup>

    </div>
  )
}
