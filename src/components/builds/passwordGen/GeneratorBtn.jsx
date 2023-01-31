import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import { StateContext } from '../../../StateManager';

export default function GeneratorBtn(props) {

    //destructure props
    let {count, numbers, lowerCase, pass, symbols, upperCase} = props.data
    
    const value = useContext(StateContext)
    //destructure main state
    const [options, setOptions] = value
    let passWord = ""



    //Generate pass btn
function makePass(){

    passWord = ""

    for (let i = 0; i < Number(count); i++) {

      //WHen passWord var is full, stop adding

      //Random upperCase letter
      if (upperCase && passWord.length !== Number(count)) {
        passWord += String.fromCharCode(randomGen(65, 90));
      }

      //Random lowerCase letter
      if (lowerCase && passWord.length !== Number(count)) {
        passWord += String.fromCharCode(randomGen(97, 122));
      }

      //Random symbols
      if (symbols && passWord.length !== Number(count)) {
        passWord += randomSym();
      }

      //Random number
      if (numbers && passWord.length !== Number(count)) {
        passWord += randomGen(0, 9);
      } 
    }

    //save new password to state
    setOptions(prev =>({...prev, 
      passGen: {...prev.passGen, pass: passWord}}))
  }

//Returns a random number between any two values.
  function randomGen(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
 }

 const symsArray = ":;<=>?@[]\^ _`{|}~"
 //Returns
 function randomSym() {
       return symsArray[Math.floor(Math.random()*symsArray.length)];
    }

  return (
    <div>
        <Button variant="dark" onClick={()=> makePass()}>Generate</Button>
    </div>
  )
}
