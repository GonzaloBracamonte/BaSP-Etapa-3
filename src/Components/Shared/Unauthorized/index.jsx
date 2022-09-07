import { Link, useHistory } from 'react-router-dom';
import Button from '../Button';
import styles from 'Components/Shared/Unauthorized/Unauthorized.module.css';

const Unauthorized = () => {
  const history = useHistory();

  return (
    <div className={styles.container}>
      <h2>401 - Unauthorized!</h2>
      <p>You do not have permission to access this place! Go back to your regular neighborhood</p>
      <Link to="/">
        <Button classes="red" onClick={() => history.goBack()}>
          Back to my neighborhood
        </Button>
      </Link>
    </div>
  );
};

export default Unauthorized;
