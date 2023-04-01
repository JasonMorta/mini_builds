import React, { useContext, useEffect } from 'react'
import imageNames from "./imageNames.js"
import CSS from './ImageLayout.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import { useLocation } from 'react-router-dom';
import PokemonImage from './PokemonImage.jsx';
import loader from './images/loading.png'
import { PokeStateContext } from '../PokeState.jsx';

export default function SpriteImages() {

  const value = useContext(PokeStateContext);
  const [state, setState] = value;

  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
  console.log('location', location)

    console.log('state selectedId', state.selectedId)
    console.log('path name', location.pathname.includes(`/pokemon/${state.selectedId}`))

    if (location.pathname !== `/pokemon`) {
      navigate(`/pokemon/${state.selectedId}`)
    }

  }, [state])
  
  


  return (
    <>
      {location.pathname.includes(state?.selectedId) ? <PokemonImage /> : <div className={CSS.spritGrid}>
     
       
        {imageNames.map((pokeName, id) => (
            
          <span className={CSS.pokeSection}>
       
            <LazyLoadImage
              key={id}
              className={CSS.pokeSprite}
              alt={pokeName}
              effect="blur"
              //height={image.height}
              src={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
              placeholderSrc={loader}
              onClick={() => {
                setState(
                      produce((state) => {
                        state.selectedId = `${id}`;
                        state.selectedName = `${pokeName.replace(".png", "").toLowerCase()}`
                      })
                    );
                    
              }}
              />
                 
              <span className={CSS.pokeName}>{pokeName.charAt(0).toUpperCase()+pokeName.slice(1).replace(".png", "")}</span>
          </span>
       
        ))}
  
        
      </div>}
      
    </>
  );
}
