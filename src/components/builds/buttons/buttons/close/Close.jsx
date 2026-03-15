import React from 'react';
import styles from './close.module.css';

export default function Close() {
  return (
    <div style={{ margin: '10px' }} className={styles.wrapper}>
      <button className={styles.button}>click me</button>
    </div>
  );
}
