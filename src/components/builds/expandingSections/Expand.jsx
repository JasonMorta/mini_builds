import React from 'react';
import { useState } from 'react';
import cardsObj from './CardsObj';
import './style.css'

export default function Expand() {

    const [images, setImages] = useState(cardsObj)
    const [active, setActive] = useState(false)
    let main = document.getElementsByClassName('container')

  return (
    <div className='container'>
        {images.map((ig, i)=>(
            <div 
                className='content'
                style={{"backgroundImage": `url(${ig.image})`}}
                key={ig.id}
                onClick={function toggleClass(e){
               
                    main[0].childNodes.forEach(r => 
                        r.classList.remove('active'))

                    e.target.className === "content" ? e.target.className = "content active": 
                    e.target.className === "content active" ? e.target.className = "content" : console.log();
             
                   
                }
              }
                >
            </div>
        ))}
    </div>
  )
}
