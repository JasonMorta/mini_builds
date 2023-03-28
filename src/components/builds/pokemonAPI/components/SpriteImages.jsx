import React, { useEffect, useState } from 'react'
import imageNames from "./imageNames.js"
import VisibilitySensor from 'react-visibility-sensor'
import {Img} from 'react-image'
import CSS from './ImageLayout.module.css'



export default function SpriteImages() {

  console.log(`./sprites/${imageNames.length}`);
  useEffect(() => {
   
     
 
  }, []);
  

  return (
    <div className={CSS.spritGrid}>
      {imageNames.map((pokeName, i) => (
        <>
          <VisibilitySensor>
            <Img
              loading="lazy"
              className={CSS.pokeSprite}
              src={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
              alt="poke"
              key={i}
            />
          
          </VisibilitySensor>
         
        </>
      ))}
    </div>
  );
}
