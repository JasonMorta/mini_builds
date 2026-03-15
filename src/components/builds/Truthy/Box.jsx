import React from 'react';
import styles from './Truthy.module.css';

export default function Box(props) {
  return (
    <div style={{ color: props.textColor }} className={styles.box} onClick={props.handleClick}>
      {props.context}
    </div>
  );
}
