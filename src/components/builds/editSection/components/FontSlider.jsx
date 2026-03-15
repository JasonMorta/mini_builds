import React from 'react';
import styles from './FontSlider.module.css';

const FontSlider = ({ element, updateElementCSS }) => {
  const currentFontSize = parseInt((element.CSS?.fontSize || '16px').replace('px', ''), 10);

  return (
    <label className={styles.Label}>
      <span>Font size: {currentFontSize}px</span>
      <input
        className={styles.Input}
        type="range"
        value={currentFontSize}
        min={5}
        max={100}
        step={1}
        onChange={(event) => updateElementCSS(element.id, 'fontSize', `${event.target.value}px`)}
      />
    </label>
  );
};

export default FontSlider;
