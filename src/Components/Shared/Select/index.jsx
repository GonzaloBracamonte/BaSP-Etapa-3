import React from 'react';
import styles from './index.module.css';

const Select = ({ text, id, options, error, register }) => {
  return (
    <div className={styles.inputContainer}>
      <label>{text}</label>
      <select className={error ? styles.inputError : styles.inputOk} name={id} {...register(id)}>
        <option selected disabled value="" className={styles.readOnly}>
          {`select ${text}`}
        </option>
        {options?.map((option, index) => (
          <option key={index} value={option.id}>
            {option.text}
          </option>
        ))}
      </select>
      {error && <p className={styles.error}>{error.message}</p>}
    </div>
  );
};

export default Select;
