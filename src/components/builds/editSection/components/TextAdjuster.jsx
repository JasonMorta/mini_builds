import React from 'react';
import styles from './text.module.css';

const TextAdjuster = ({ element, updateElementCSS }) => {
  function handleTextData(option) {
    if (element.type === 'button') {
      if (option === 'left') updateElementCSS(element.id, 'justifyContent', 'start');
      if (option === 'center') updateElementCSS(element.id, 'justifyContent', 'center');
      if (option === 'right') updateElementCSS(element.id, 'justifyContent', 'end');
      return;
    }

    if (option === 'bold') {
      updateElementCSS(element.id, 'fontWeight', element.CSS?.fontWeight === 'bold' ? 'revert' : 'bold');
      return;
    }

    if (option === 'left') updateElementCSS(element.id, 'textAlign', 'left');
    if (option === 'center') updateElementCSS(element.id, 'textAlign', 'center');
    if (option === 'right') updateElementCSS(element.id, 'textAlign', 'right');
  }

  return (
    <div className={styles.Root}>
      {element.type === 'text' ? (
        <button type="button" className={styles.Button} onClick={() => handleTextData('bold')}>
          Bold
        </button>
      ) : null}
      <button type="button" className={styles.Button} onClick={() => handleTextData('left')}>
        Left
      </button>
      <button type="button" className={styles.Button} onClick={() => handleTextData('center')}>
        Center
      </button>
      <button type="button" className={styles.Button} onClick={() => handleTextData('right')}>
        Right
      </button>
    </div>
  );
};

export default TextAdjuster;
