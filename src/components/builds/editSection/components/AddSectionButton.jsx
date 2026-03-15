import * as React from 'react';
import styles from './AddSectionBtn.module.css';

const AddSectionButton = ({ addSection, toggleEditMode }) => {
  return (
    <div className={styles.Actions}>
      <button type="button" className={styles.ActionButton} onClick={toggleEditMode}>
        Toggle edit
      </button>
      <button type="button" className={styles.ActionButton} onClick={addSection}>
        Add section
      </button>
    </div>
  );
};

export default AddSectionButton;
