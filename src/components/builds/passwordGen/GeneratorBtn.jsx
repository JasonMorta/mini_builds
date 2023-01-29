import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { StateContext } from '../../../StateManager';

export default function GeneratorBtn(props) {

    //destructure props
    const {count, numbers, lowerCase, pass, symbols, upperCase} = props.data

    const value = useContext(StateContext)
    //destructure main state
    const [options, setOptions] = value
    let passWord = ""



    //Generate pass btn
function makePass(){
  console.log(passWord.length);
    // options.pass = "hello"
    // setPass(options.pass)
    //console.log(count);
    passWord = ""
    for (let i = 0; i < count/2; i++) {
      if (base()) {
        break
      }
        //Base case.
       
        //Random number
        if (numbers && !base()) {
          passWord += randomGen(0, 9) 
        }

        //Random lowerCase letter
        if (lowerCase && !base()) {
          passWord +=  String.fromCharCode(randomGen(97, 122))
        }

        //Random upperCase letter
        if (upperCase && !base()) {
          passWord +=  String.fromCharCode(randomGen(65, 90))
        } 

   
   
    }

    function base(){
      return count === passWord.length
    }
  

    //props.data.pass
    //props.data.symbols
    //props.data.upperCase
    console.log(passWord);
  }

//Returns a random number between any two values.
  function randomGen(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
 }

  return (
    <div>
        <Button variant="dark" onClick={()=> makePass()}>Generate</Button>
    </div>
  )
}
