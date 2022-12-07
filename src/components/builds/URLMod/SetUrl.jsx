/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import BootCampList from './BootCampList';
import './url.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Dropdown } from 'bootstrap';
import Radios from './Radios';

export default function SetUrl() {

    const [myUrl, setMyUrl] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const bootCamps = ["none", "Software Engineering", "Web Development", "Data Science"]
    const [selectBC, setSelectBC] = useState("BoostCamps")
   

    //student no: CP22100003767
    //course: DfE - Software Engineering
    //task: Task 48
    //https://www.dropbox.com/work/CP22100003767/Software%20Engineer%20Bootcamp/T48

    function handleClick(){
      //alert(window.location)
      //setMyUrl("https://www.dropbox.com/work")
      console.log(newUrl);
    }

    function handleBootcamps(e){
      setSelectBC(e.target.value)
      //console.log(e.target.value.replaceAll(" ", "%20"));
  }


  return (
    <div className='get_student'>
    <p>Opens student dropbox folder</p>
      <Box
      sx={{'&>:not(style)':{m:1, width: '25ch' }}}
      noValidate
      autoComplete="off">
     
      <TextField 
        id="filled-basic" 
        label="Student Number" 
        variant="filled"
        defaultValue={newUrl}
        onInput={(e)=>{
                setNewUrl(e.target.value)
              }}  />
                 {/* <InputGroup className="mb-3">
        <Form.Control
          placeholder="Recipient's username"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Text id="basic-addon2">@example.com</InputGroup.Text>
      </InputGroup> */}
   

     
    {/* </Box> */}



<Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3" >
          <h3>Bootcamp</h3>
           <Form.Check
            inline
            label=" - None"
            name="group1"
            type={type}
            data-bc={" "}
            id={`inline-${type}-1`}
            onClick={(e)=>  setDopDown(e.target.dataset.bc)}
          />
          <Form.Check
            inline
            label=" - Web Development"
            name="group1"
            type={type}
            data-bc={"Web%20Development%20Bootcamp"}
            id={`inline-${type}-1`}
            onClick={(e)=>  setDopDown(e.target.dataset.bc)}
          />
          <Form.Check
            inline
            label=" - Software Engineering"
            name="group1"
            type={type}
            data-bc={"Software%20Engineer%20Bootcamp"}
            id={`inline-${type}-2`}
            onClick={(e)=>  setDopDown(e.target.dataset.bc)}
          />
          <Form.Check
            inline
            label="3 DS"
            name="group1"
            type={type}
            data-bc={"Data%20Science%20Bootcamp"}
            id={`inline-${type}-1`}
            onClick={(e)=> setDopDown(e.target.dataset.bc)}
          />
                    {/* <Form.Check
                 
            label="Data Science"
            name="group3"
            type={type}
            id={`reverse-${type}-3`}
          /> */}
        </div>
      ))}
    </Form>





    <Radios 
      handleBootcamps={handleBootcamps}/>

    <a href={`https://www.dropbox.com/work/${newUrl}/${dopDown}/${selectBC === "none" ? "": selectBC}`} 
        target="_blank" 
        >
      <button 
        className="button button5"
        onClick={handleClick}
        >Open folder</button>
    </a>
    </div>
  )
}
