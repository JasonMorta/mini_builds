import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { StateContext } from '../../../StateManager';

export default function GeneratorBtn(props) {

    //destructure props
    const {count, numbers, lowerCase, pass, symbols, upperCase} = props.data

    const value = useContext(StateContext)
    //destructure main state
    let [options, setOptions] = value



    //Generate pass btn
function makePass(){
    // options.pass = "hello"
    // setPass(options.pass)
    console.log(count);

    for (let i = 0; i < count; i++) {
        if (numbers) {
            
        }
    }

    function randomGen(lo, hi) {
       return Math.floor((Math.random() * hi ) + lo)
    }
    
  
     
   
    //props.data.pass
    //props.data.symbols
    //props.data.upperCase
  }


  return (
    <div>
        <Button variant="dark" onClick={()=> makePass()}>Generate</Button>
    </div>
  )
}
