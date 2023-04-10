import React, { useContext, useEffect, useState } from 'react';
import imageNames from './imageNames.js';
import CSS from './ImageLayout.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useNavigate } from 'react-router-dom';
import produce from 'immer';
import { useLocation } from 'react-router-dom';
import loader from './images/loading.png';
import { PokeStateContext } from '../PokeState.jsx';
import PokemonImage from './PokemonImage.jsx';

export default function SpriteImages() {
  console.log(`%c SpriteImages`, 'color: #2196f3');
  const [pokeId, setPokeId] = useState({name: null, id: null});
  const [test, setTest] = useState(true)


  const value = useContext(PokeStateContext);
  const [state, setState] = value;


  let location = useLocation();

  let navigate = useNavigate();


  useEffect(() => {
    // If the location state contains a selectedId, scroll to that image
    // if (location.state && location.state.selectedId) {
    //   const selectedId = location.state.selectedId;
    //   const selectedImage = document.getElementById(`image-${selectedId}`);
    //   selectedImage.scrollIntoView();
    // }
    // console.log('location', location)
  }, []);
  console.log('location.pathname', location.pathname)
  console.log('location.pathname.includes(`${pokeId}`)', location.pathname.includes(`${pokeId.id}`))
  console.log('pokeId', pokeId)


  return (
    <>
  {location.pathname.includes(`${pokeId.id}`) ? 
  
  <PokemonImage />
    :
  <div className={CSS.spritGrid}>
        {imageNames.map((pokeName, id) => (
          <span className={CSS.pokeSection} key={id}>
            <LazyLoadImage
              id={`image-${id}`}
              className={CSS.pokeSprite}
              alt={pokeName}
              effect="blur"
              src={process.env.PUBLIC_URL + `/sprites/${pokeName}`}
              placeholderSrc={loader}
              onClick={() => {
                navigate(`/pokemon/${id}`, { state: { name: pokeName.replace('.png', ''), selectedId: `${id}` } });
                setPokeId({name: pokeName.replace('.png', ''), id: id})
                // setState(
                //   produce((state) => {
                //     state.selectedId = `${id}`;
                //     state.selectedName = `${pokeName.replace('.png', '').toLowerCase()}`;
                //   })
                // );
              }}
            />
            <span className={CSS.pokeName}>{pokeName.charAt(0).toUpperCase() + pokeName.slice(1).replace('.png', '')}</span>
          </span>
        ))}
      </div>}
    </>
  );
}
