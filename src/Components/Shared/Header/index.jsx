import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar, setHome } from 'redux/global/actions';
import firebase from 'helper/firebase';
import Button from 'Components/Shared/Button';
import menu from 'assets/icons/menu-icon.png';
import logo from 'assets/icons/app-logo.png';
import styles from './header.module.css';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.global.showSidebar);
  const homePath = useSelector((state) => state.global.homePath);
  const [showMenu, setShowMenu] = useState(false);
  const [logged, setLogged] = useState(false);
  const employeeRoutes = useRouteMatch('/employee');
  const adminRoutes = useRouteMatch('/admin');

  const changeHeader = () => {
    employeeRoutes || adminRoutes ? setShowMenu(true) : setShowMenu(false);
    sessionStorage.getItem('token') ? setLogged(true) : setLogged(false);
  };

  const logOut = () => {
    firebase.auth().signOut();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    dispatch(setHome('/'));
    history.push('/');
  };

  useEffect(() => changeHeader(), [history.location.pathname]);

  return (
    <header className={styles.container}>
      {showMenu ? (
        <img
          src={menu}
          alt="menu toggler"
          className={styles.menu}
          onClick={() => dispatch(toggleSidebar(!showSidebar))}
        />
      ) : (
        //to keep logo centered on the header
        <div></div>
      )}
      <Link to={homePath}>
        <img src={logo} alt="Page logo" className={styles.logo} />
      </Link>
      {logged ? (
        <Button classes="red" onClick={logOut}>
          Log Out
        </Button>
      ) : (
        <Link to="/auth/login">
          <Button>Log In</Button>
        </Link>
      )}
    </header>
  );
}

export default Header;
