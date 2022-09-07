import styles from './home.module.css';
import { useSelector } from 'react-redux';

function Home() {
  const user = useSelector((store) => store.auth.user);

  return (
    <section className={styles.container}>
      <h2 className={styles.h2}>
        <p className={styles.p}>Welcome,</p>
        <p className={styles.p}>{user?.firstName + ' ' + user?.lastName}</p>
      </h2>
    </section>
  );
}

export default Home;
