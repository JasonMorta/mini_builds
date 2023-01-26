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
   

        if (numbers) {
          passWord += randomGen(0, 9)
        }

        if (lowerCase) {
          passWord +=  String.fromCharCode(randomGen(97, 122))
        }
        if (count === passWord.length) {
          break
         }
    }

    //props.data.pass
    //props.data.symbols
    //props.data.upperCase
    console.log(passWord);
  }


  function randomGen(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
 }

  return (
    <div>
        <Button variant="dark" onClick={()=> makePass()}>Generate</Button>
    </div>
  )
}
