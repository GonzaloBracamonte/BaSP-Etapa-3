import React from 'react';
import styles from './loading.module.css';

const Loading = () => {
  return (
    <section className={styles.containerLoading}>
      <div className={styles.loader}></div>
    </section>
  );
};

export default Loading;
