import React from 'react'
import { useState } from 'react'
import './card.css'

export default function Card(props) {

  const [cards, setcards] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);
  const [winningNum, setWinningNum] = useState("")
  //the winning number is chosen when the page loads.
  //if the winning number matches the selected cards id, change the text to win else lose

function handleClick(){
 
  if (!props.gameOver) {
    setWinningNum(Math.floor(Math.random() * 3))
  }
 
}


  let myCards = cards.map((card, i)=> (

    <div 
      className={`div ${props.cardData === card.id ? "" : "div card-back "}`}
      id="mainDiv1"
       key={i}
       data-card-data={card.id}
       onClick={props.handleClick}
       onMouseDown={handleClick}
       >
      <h2 
        className="h2-heading h2-back"
        data-card-data={card.id}
        id="header">
          {winningNum === card.id ? "WIN" : "LOSE"}
          </h2>

    </div>
  ))
  return (
    <div className='card-container'>
    {myCards}
    </div>
  )
}
