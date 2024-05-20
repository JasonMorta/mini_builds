import React, { useState, useEffect, useRef } from 'react';
import "./loaders.css";
import StyledButton from "../../StyledButton";
import DataLoader from './DataLoader';

export default function Loaders() {
  //const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const h2Ref = useRef(null);

  

  console.count('Loaded');

  useEffect(() => {
    progressRef.current.value = 0;
    h2Ref.current.innerText = 'Progress: 0%';
  }, []);

  function increaseProgress(){
    console.log('increaseProgress');
    progressRef.current.value = 0;

    let progress = progressRef.current.value;
 
    // if (progress === 100) return; // If progress is already at 100%, do nothing

    const interval = setInterval(() => {
      // Increase progress by 1% every 100 milliseconds

        progress += 1
        if (progress >= 100) {
          clearInterval(interval);
        }
         progressRef.current.value = progress;
     
         h2Ref.current.innerText = `Progress: ${progress}%`;
        //  console.log('progress', progress)
    }, 10);
  };





  return (
    <div className='loaders_container'>
     <section className='loading_progress'>
        <p>Here the useRef hook is used to <b>avoid re-rendering</b> the component on progress updates.</p>
        <h2 ref={h2Ref} ></h2>
        <progress className='testRev' ref={progressRef} value={ progressRef.current?.value} max="100" />
        <br />
        <StyledButton 
        type="secondary" 
        disabled={false}
        text={"Load"}
        //onClick={increaseProgress}
        onPress={increaseProgress}
        />
     </section>
      <br />
      <DataLoader />
    </div>
  );
}
