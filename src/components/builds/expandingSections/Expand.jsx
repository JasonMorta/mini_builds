import React from 'react';
import { useState } from 'react';
import cardsObj from './CardsObj';
import './style.css'

export default function Expand() {

    const [images, setImages] = useState(cardsObj)
    const [active, setActive] = useState(false)
    let main = document.getElementsByClassName('container')


    //timeout is needed, as nodeList 1st need to load in.
    //preview one image on load
    setTimeout(() => {
      main[0].childNodes[1].classList.add('active')//image
      main[0].childNodes[1].children[0].classList.add('activeText')

    }, 200);

  return (
    <div className='container'>
        {images.map((ig, i)=>(
            <div 
                className='content'
                style={{"backgroundImage": `url(${ig.image})`}}
                key={ig.id}
                onClick={function toggleClass(e){
               console.log(main);

               //active text
               main[0].childNodes.forEach(x =>
                x.children[0].classList.remove('activeText')
                )
             

               //on click remove the active className from every sibling div
                    main[0].childNodes.forEach(r => 
                        r.classList.remove('active'))

                    e.target.className === "content" ? e.target.className = "content active": 
                    e.target.className === "content active" ? e.target.className = "content" : console.log();

                    e.target.children[0].className === 'text' ? e.target.children[0].className = 'text activeText': 
                    e.target.children[0].className === 'text activeText' ? e.target.children[0].className = 'text': console.log();
                }
              }
                >
                  <h1 className='text'>{ig.txt}</h1>
            </div>
        ))}
    </div>
  )
}
