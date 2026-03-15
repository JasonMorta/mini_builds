import React, { useContext, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Box from './Box';
import BoxAware from './BoxAware';
import SwitchExample from './Switch';
import { StateContext } from '../../../StateManager';
import styles from './Truthy.module.css';

export default function Truthy() {
  const [mainState] = useContext(StateContext);
  const [array, setArray] = useState([
    { id: 1, on: true },
    { id: 2, on: false },
    { id: 3, on: false },
  ]);
  const [flip, setFlip] = useState(false);

  function toggle(id) {
    setArray((prev) => prev.map((item) => (item.id === id ? { ...item, on: !item.on } : item)));
  }

  function boxAware(id) {
    setArray((prev) => prev.map((item) => ({ ...item, on: item.id === id ? !item.on : false })));
  }

  const unaware = useMemo(() => array.map((bx) => (
    <Box key={bx.id} textColor={bx.on ? '#f2c078' : '#d28b72'} handleClick={() => toggle(bx.id)} context={bx.on.toString()} />
  )), [array]);

  const aware = useMemo(() => array.map((val) => (
    <BoxAware key={val.id} textColor={val.on ? '#f2c078' : '#d28b72'} handleClick={() => boxAware(val.id)} context={val.on.toString()} />
  )), [array]);

  function flipSwitch(event) {
    setFlip(event.target.checked);
  }

  return (
    <motion.div initial={mainState.motion.initial} animate={mainState.motion.animate} exit={mainState.motion.exit} transition={mainState.motion.transition}>
      <div className={styles.container}>
        <section className={`${styles.section} build-card`}>
          <h2>Unaware boxes</h2>
          <p className="muted-copy">Flip the selected truthy value only.</p>
          <div className={styles.boxes}>{unaware}</div>
        </section>
        <section className={`${styles.section} build-card`}>
          <h2>Aware boxes</h2>
          <p className="muted-copy">Keep only the clicked aware value active.</p>
          <div className={styles.boxes}>{aware}</div>
        </section>
        <section className={`${styles.section} build-card`}>
          <p className="muted-copy">Basic switch state demo.</p>
          <SwitchExample handleSwitch={flipSwitch} checked={flip} />
        </section>
      </div>
    </motion.div>
  );
}
