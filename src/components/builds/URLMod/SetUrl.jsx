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
        onInput={(e)=>setNewUrl(e.target.value)}  />
   
    </Box>
     
    <Radios 
      handleBootcamps={handleBootcamps}/>

    <a href={`https://www.dropbox.com/work/${newUrl}/${selectBC === "none" ? "": selectBC}`} 
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
