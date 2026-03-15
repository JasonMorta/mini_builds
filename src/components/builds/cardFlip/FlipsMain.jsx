import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Confetti from 'react-confetti';
import styles from './FlipsMain.module.css';
import Card from './Card';

function createDeck() {
  const winnerIndex = Math.floor(Math.random() * 3);

  return Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    isWinner: index === winnerIndex,
    revealed: false,
  }));
}

export default function FlipsMain() {
  const [deck, setDeck] = useState(createDeck);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const boardRef = useRef(null);
  const cardRefs = useRef([]);

  const selectedCard = useMemo(
    () => deck.find((card) => card.id === selectedCardId) || null,
    [deck, selectedCardId]
  );

  const gameMessage =
    selectedCard == null
      ? 'Pick a card to reveal the result.'
      : selectedCard.isWinner
      ? 'You found the winning card.'
      : 'Not this time — the winning card has been revealed.';

  useEffect(() => {
    const updateBounds = () => {
      if (!boardRef.current) return;
      const nextBounds = boardRef.current.getBoundingClientRect();
      setBounds({ width: nextBounds.width, height: nextBounds.height });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  useLayoutEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          x: () => gsap.utils.random(-110, 110),
          y: () => gsap.utils.random(-90, 90),
          rotate: () => gsap.utils.random(-16, 16),
          scale: 0.88,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.62,
          stagger: 0.08,
          ease: 'back.out(1.45)',
        }
      );
    }, boardRef);

    return () => ctx.revert();
  }, [roundKey]);

  const registerCardRef = (node, index) => {
    cardRefs.current[index] = node;
  };

  const handleCardPick = (cardId) => {
    if (selectedCardId !== null) return;

    const nextSelectedCard = deck.find((card) => card.id === cardId);
    setSelectedCardId(cardId);
    setShowConfetti(Boolean(nextSelectedCard?.isWinner));
    setDeck((currentDeck) =>
      currentDeck.map((card) =>
        card.id === cardId ? { ...card, revealed: true } : card
      )
    );

    // After the user picks once, reveal the rest so the result is immediately understandable.
    window.setTimeout(() => {
      setDeck((currentDeck) => currentDeck.map((card) => ({ ...card, revealed: true })));
    }, 280);
  };

  const handleRestart = () => {
    setShowConfetti(false);
    setSelectedCardId(null);
    cardRefs.current = [];
    setRoundKey((current) => current + 1);
    setDeck(createDeck());
  };

  return (
    <div className={styles.root}>
      <section className={styles.info}>
        <div>
          <p className={styles.eyebrow}>Card flip game</p>
          <h3 className={styles.title}>Find the single winning card</h3>
          <p className={styles.copy}>
            Each round hides one winning card. Cards stay face-down until clicked,
            then the board reveals the result and lets you play again.
          </p>
        </div>
        <div className={styles.actions}>
          <span className={selectedCard?.isWinner ? styles.messageWin : styles.messageIdle}>{gameMessage}</span>
          <button type="button" className={styles.restartButton} onClick={handleRestart}>
            Play again
          </button>
        </div>
      </section>

      <section ref={boardRef} className={styles.board}>
        {showConfetti ? (
          <div className={styles.confettiLayer}>
            <Confetti
              width={Math.max(bounds.width, 320)}
              height={Math.max(bounds.height, 320)}
              recycle={true}
              run={showConfetti}
              numberOfPieces={120}
              gravity={0.16}
              wind={0.01}
              initialVelocityY={4}
            />
          </div>
        ) : null}

        <div className={styles.cardGrid}>
          {deck.map((card, index) => (
            <Card
              key={card.id}
              card={card}
              disabled={selectedCardId !== null}
              onClick={() => handleCardPick(card.id)}
              registerRef={(node) => registerCardRef(node, index)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
