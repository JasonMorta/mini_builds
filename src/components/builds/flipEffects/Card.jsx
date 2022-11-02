import React from 'react'
import { useState } from 'react'
import './card.css'

export default function Card(props) {

  const [cards, setcards] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);

  let myCards = cards.map((card, i)=> (

    <div 
      className="div" 
      id="mainDiv1"
       key={i}
       data-card-data={card.id}
       onClick={props.handleClick}
       >
      <h2 className="h2-heading" id="header">Card {card.id}</h2>

    </div>
  ))
  return (
    <div className='card-container'>
    {myCards}
    </div>
  )
}
