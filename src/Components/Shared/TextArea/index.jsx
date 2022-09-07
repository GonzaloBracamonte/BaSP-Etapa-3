import React from 'react';
import styles from './index.module.css';

const TextArea = ({ text, id, value, required }) => {
  return (
    <div className={styles.textAreaContainer}>
      <label className={styles.labelTextArea}>{text}</label>
      <textarea className={styles.textAreaBox} id={id} value={value} required={required}></textarea>
    </div>
  );
};

export default TextArea;
