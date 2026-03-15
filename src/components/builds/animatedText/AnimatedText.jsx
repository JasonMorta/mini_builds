import React, { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { StateContext } from '../../../StateManager';
import styles from './AnimatedText.module.css';
import FontDropDown from './FontDrop_down';
import Slider from './Slider';

const AnimatedLetter = styled.h1`
  color: inherit;

  &:hover {
    animation: none;
    transition: 0.3s;
    transform: translateY(-2px);
  }
`;

const palette = ['#ffcf8b', '#d4a45e', '#f6efe6', '#b8874f', '#9f7350'];
const animationMap = {
  'text-pop-up-top': styles.textPopUpTop,
  'tracking-in-contract-bck-top': styles.trackingInContractBckTop,
  'text-focus-in': styles.textFocusIn,
  'focus-in-expand': styles.focusInExpand,
  'roll-in-blurred-left': styles.rollInBlurredLeft,
};

export default function AnimatedText() {
  const [share] = useContext(StateContext);
  const [text, setText] = useState('Animated Text');
  const [speed, setSpeed] = useState(0.5);
  const [animationClass, setAnimationClass] = useState('text-pop-up-top');
  const [fontSize, setFontSize] = useState(50);
  const [lockedLetters, setLockedLetters] = useState({});

  const words = useMemo(() => text.split(' '), [text]);

  function handleTextInput(event) {
    setText(event.target.value || 'Animated Text');
    // Reset clicked letter state when the source string changes so stale indexes do not linger.
    setLockedLetters({});
  }

  function toggleLetterState(letterKey) {
    setLockedLetters((prev) => ({ ...prev, [letterKey]: !prev[letterKey] }));
  }

  return (
    <motion.div
      initial={share.motion.initial}
      animate={share.motion.animate}
      exit={share.motion.exit}
      transition={share.motion.transition}
      className={styles.root}
    >
      <div className={`build-panel ${styles.panel}`}>
        <h2>Enter some text</h2>
        <div className={styles.inputField}>
          <input
            onChange={handleTextInput}
            type="text"
            value={text}
            className={styles.input}
            placeholder="Animated Text"
            id="animated-text-input"
          />
        </div>
      </div>

      <div className={styles.stage}><div className={styles.animatedText}>
        {words.map((word, wordIndex) => (
          <div className={styles.indexContainer} key={`${word}-${wordIndex}`}>
            {word.split('').map((char, charIndex) => {
              const letterKey = `${wordIndex}-${charIndex}`;
              return (
                <AnimatedLetter
                  key={`${char}-${wordIndex}-${charIndex}`}
                  className={[
                    styles.animatedLetter,
                    animationMap[animationClass],
                    lockedLetters[letterKey] ? styles.stayDown : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => toggleLetterState(letterKey)}
                  style={{
                    animationDuration: `${speed}s`,
                    fontSize: `${fontSize}px`,
                    color: palette[(wordIndex + charIndex) % palette.length],
                  }}
                >
                  {char}
                </AnimatedLetter>
              );
            })}
          </div>
        ))}
      </div></div>

      <div className={`animated-build__controls build-panel ${styles.controlsPanel}`}>
        <div className="animated-build__controlsRow">
          <div className={styles.controlCard}>
            <FontDropDown
              value={animationClass}
              handleClick={(event) => setAnimationClass(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.controlCard}>
          <Slider
            text={`Font size: ${fontSize}px`}
            value={fontSize}
            onChange={(event) => setFontSize(event.target.value)}
          />
        </div>
      </div>
    </motion.div>
  );
}
