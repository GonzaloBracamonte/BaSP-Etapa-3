import React from 'react';
import styles from './home.module.css';

function SuperAdminHome() {
  return (
    <section className={styles.container}>
      <h2 className={styles.header}>
        <p className={styles.paragraph}>Welcome</p>
        <p className={styles.paragraph}>Esteban Frare</p>
      </h2>
    </section>
  );
}

export default SuperAdminHome;
