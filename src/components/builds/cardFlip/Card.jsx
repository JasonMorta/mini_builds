import React, { useState } from 'react';
import styles from './Card.module.css';

export default function Card(props) {
  const [cards] = useState([{ id: 0 }, { id: 1 }, { id: 2 }]);
  const [winningNum, setWinningNum] = useState('');

  function handleClick() {
    if (!props.gameOver) {
      setWinningNum(Math.floor(Math.random() * 3));
    }
  }

  return (
    <div className={styles.cardContainer}>
      {cards.map((card) => (
        <div
          className={`${styles.cardFace} ${props.cardData === card.id ? '' : styles.cardBack}`}
          id="mainDiv1"
          key={card.id}
          data-card-data={card.id}
          data-get-truth={winningNum === card.id}
          onClick={props.handleClick}
          onMouseDown={handleClick}
        >
          <h2 className={styles.heading} data-card-data={card.id} id="header">
            {winningNum === card.id ? 'WIN' : 'LOSE'}
          </h2>
        </div>
      ))}
    </div>
  );
}
