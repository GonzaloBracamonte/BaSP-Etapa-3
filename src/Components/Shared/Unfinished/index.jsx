/* eslint-disable react/no-unescaped-entities */
import { useLocation } from 'react-router-dom';
import styles from './Unfinished.module.css';

const Unfinished = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <h2>
        <span>"{location.pathname === '/' ? 'Home' : location.pathname}"</span> in Construction!
      </h2>
      <p>
        Our Developers went to foo bar, get yourself a snack and go chill n' netflix while we finish
        this page for you
      </p>
    </div>
  );
};

export default Unfinished;
