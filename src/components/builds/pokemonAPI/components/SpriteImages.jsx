import React from 'react'
import {BrowserRouter as Router} from "react-router-dom";
import imageNames from "./imageNames.js"
import CSS from './ImageLayout.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function SpriteImages() {

  return (
    <>
      <div className={CSS.spritGrid}>
     
       
        {imageNames.map((pokeName, i) => (
            
          <span className={CSS.pokeSection}>
          <Link to="/pokemon/details"  key={pokeName}>
            <LazyLoadImage
              key={i}
              className={CSS.pokeSprite}
              alt={pokeName}
              effect="blur"
              //height={image.height}
              src={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
              placeholderSrc={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
              //width={image.width} 
              />
                 </Link>
              <span className={CSS.pokeName}>{pokeName.charAt(0).toUpperCase()+pokeName.slice(1).replace(".png", "")}</span>
          </span>
       
        ))}
  
        
      </div>
        <Outlet />
    </>
  );
}
