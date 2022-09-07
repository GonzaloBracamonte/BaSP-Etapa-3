import styles from './index.module.css';
import logo from 'assets/icons/logo.png';

const Homepage = () => {
  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>TRACKGENIX</h1>
      <img src={logo} alt="logo" />
    </section>
  );
};

export default Homepage;
