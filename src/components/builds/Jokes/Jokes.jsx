/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-pascal-case */
import chuckie from './pics/chuck.png';
import React, { useContext } from 'react';
import styles from './Jokes.module.css';
import BsButton from '../BsButton';
import FetchJoke from './FetchJoke';
import { StateContext } from '../../../StateManager';
import Category from './Category';
import { motion } from 'framer-motion';

export default function Jokes() {
  const value = useContext(StateContext);
  const [mainState, setMainState] = value;

  return (
    <motion.div
      initial={mainState.motion.initial}
      animate={mainState.motion.animate}
      exit={mainState.motion.exit}
      transition={mainState.motion.transition}
      className={styles.root}
    >
      <div className={styles.controls}>
        <BsButton
          handleClick={() => setMainState((prev) => ({ ...prev, nextJoke: !prev.nextJoke }))}
          className={styles.newJokeBtn}
          text={'Next Joke'}
          variant={'danger'}
        />
        <Category />
      </div>

      <section className={styles.hero}>
        <div className={styles.logoWrap}><img src={chuckie} className={styles.logo} alt="Chuck Norris illustration" /></div>
        <div className={styles.stack}>
          <FetchJoke />
          <FetchJoke />
          <FetchJoke />
        </div>
      </section>
    </motion.div>
  );
}
