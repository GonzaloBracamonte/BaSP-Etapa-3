import { Link } from 'react-router-dom';
import Button from '../Button';
import styles from 'Components/Shared/NotFound/NotFound.module.css';

const NotFound = () => (
  <div className={styles.container}>
    <h2>404 - Not Found!</h2>
    <p>We could not find this path on the map, sorry!</p>
    <Link to="/">
      <Button classes="red">Go Home</Button>
    </Link>
  </div>
);

export default NotFound;
