import React, { useContext } from 'react'
import CSS from './passGen.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import GeneratorBtn from './GeneratorBtn';
import { StateContext } from '../../../StateManager';
import { Prev } from 'react-bootstrap/esm/PageItem';

export default function PassGen() {

  const value = useContext(StateContext)
  
  let [options, setOptions] = value



  return (
    <div className={CSS.box}>
      <h5>Generate a random password</h5>
          {/* password output */}
      <label for="pass">Password:</label>
      <InputGroup className="mb-">
        <Form.Control
          id="pass" 
          name="pass"
          aria-label="Recipient's username"
          defaultValue={options.passGen.pass}
        />
        <Button variant="outline-secondary" id="button-addon2">
          copy
        </Button>
      </InputGroup>

      {/* Pass word options.passGen */}
      <div className={CSS.pass_options}>
        <h5>Include characters</h5>
      <div className={CSS.check_container + ` mb-3`}>
        {/* word count */}
      <Form.Label>Charters amount <b>{options.passGen.count}</b></Form.Label>
      <Form.Range 
       max="10"
       min="3"
      onChange={(e)=> {setOptions(prev =>({...prev, 
        passGen: {...prev.passGen, count: e.target.value}}))}} />

      {/* UpperCase */}
      <Form.Check 
            type="checkbox"
            id={`default-checkbox1`}
            label={`UpperCase Letters`}
            name="group1"
            className={CSS.upperC}
            defaultChecked={options.passGen.upperCase}
            onChange={(e)=> {setOptions(prev =>({...prev, 
              passGen: {...prev.passGen, upperCase: e.target.checked}}))}}
          />
       {/* LowerCase */}    
      <Form.Check 
            type="checkbox"
            id={`default-checkbox2`}
            label={`LowerCase Letters`}
            name="group2"
            className={CSS.upperC}
            defaultChecked={options.passGen.lowerCase}
            onChange={(e)=> {setOptions(prev =>({...prev, 
              passGen: {...prev.passGen, lowerCase: e.target.checked}}))}}
          />
      {/* Symbols */}       
      <Form.Check 
            type="checkbox"
            id={`default-checkbox3`}
            label={`Symbols`}
            className={CSS.upperC}
            defaultChecked={options.passGen.symbols}
            onChange={(e)=> {setOptions(prev =>({...prev, 
              passGen: {...prev.passGen, symbols: e.target.checked}}))}}
          />
      {/* Numbers */}  
      <Form.Check 
            type="checkbox"
            id={`default-checkbox4`}
            label={`Numbers`}
            className={CSS.upperC}
            defaultChecked={options.passGen.numbers}
            onChange={(e)=> {setOptions(prev =>({...prev, 
              passGen: {...prev.passGen, numbers: e.target.checked}}))}}
          />
          </div>
          <GeneratorBtn  data={options.passGen} />
      </div>
    </div>
  )
}
