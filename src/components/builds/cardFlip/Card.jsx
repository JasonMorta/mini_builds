import React from 'react';
import styles from './Card.module.css';

export default function Card({ card, disabled, onClick, registerRef }) {
  return (
    <button
      ref={registerRef}
      type="button"
      className={styles.cardButton}
      onClick={onClick}
      disabled={disabled}
      aria-label={card.revealed ? (card.isWinner ? 'Winning card' : 'Losing card') : 'Face-down card'}
    >
      <div className={`${styles.cardInner} ${card.revealed ? styles.revealed : ''}`}>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <span className={styles.cardMark}>★</span>
          <div className={styles.cardBackCenter}>
            <span className={styles.cardBackPill}>Flip</span>
            <strong className={styles.cardBackTitle}>Mystery card</strong>
            <span className={styles.cardBackCopy}>Tap to reveal your result</span>
          </div>
          <span className={styles.cardCorner}>A</span>
        </div>

        <div className={`${styles.cardFace} ${card.isWinner ? styles.cardFrontWin : styles.cardFrontLose}`}>
          <span className={styles.frontIcon}>{card.isWinner ? '🏆' : '✕'}</span>
          <strong className={styles.frontTitle}>{card.isWinner ? 'WIN' : 'LOSE'}</strong>
          <span className={styles.frontCopy}>
            {card.isWinner ? 'Confetti unlocked.' : 'Try again next round.'}
          </span>
        </div>
      </div>
    </button>
  );
}
