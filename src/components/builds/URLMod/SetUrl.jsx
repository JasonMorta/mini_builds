import React, { useState } from 'react';
import BootCampList from './BootCampList';
import './url.css';
import Form from 'react-bootstrap/Form';

export default function SetUrl() {

    const [myUrl, setMyUrl] = useState("")
    const [newUrl, setNewUrl] = useState("")
    const bootCapms = [ "Software Engineering", "Web Development", "Data Science"]
    const [dopDown, setDopDown] = useState("BoostCamps")
   

    //student no: CP22100003767
    //course: DfE - Software Engineering
    //task: Task 48
    //https://www.dropbox.com/work/CP22100003767/Software%20Engineer%20Bootcamp/T48

    function handleClick(){
      //alert(window.location)
      //setMyUrl("https://www.dropbox.com/work")
      console.log(newUrl);
    }

    function handleSelect(e){
      //console.log(e.target.innerText);
      setDopDown(e.target.innerText)
  }


  return (
    <>
    <p>Opens student dropbox folder</p>
      <div id="urlInputField">
      <label for="sNumber">Student number:</label>
            <input 
              type="text" 
              className="url-inputs" 
              defaultValue={newUrl}
              onInput={(e)=>setNewUrl(e.target.value)} 
              name="sNumber"/>
      </div>
      {/* <BootCampList 
        boots={bootCapms}
        dops={dopDown}
        handleSelect={handleSelect}/> */}



<Form>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3" >
          <Form.Check
            inline
            label="1 WD"
            name="group1"
            type={type}
            data-bc={"Web "}
            id={`inline-${type}-1`}
            onClick={(e)=>  setDopDown(e.target.dataset.bc)}
          />
          <Form.Check
            inline
            label="2 SE"
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





    <a  href={`https://www.dropbox.com/work/${newUrl}/${dopDown}`} 
        target="_blank" 
        rel="noreferrer"
        >
      <button 
        className="button button5"
        onClick={handleClick}
        >Open folder</button>
    </a>
    </>
  )
}
