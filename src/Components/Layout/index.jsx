import { useEffect } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from 'redux/global/actions';
import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import Sidebar from 'Components/Shared/Sidebar';
import styles from './layout.module.css';
import { tokenListener } from 'helper/firebase';
import { getAuthAdmin } from 'redux/thunks/admin';
import { getAuthEmployee } from 'redux/thunks/employee';

const Layout = ({ children }) => {
  const showSidebar = useSelector((state) => state.global.showSidebar);
  const location = useLocation();
  const employeeRoutes = useRouteMatch('/employee');
  const adminRoutes = useRouteMatch('/admin');
  const superAdminRoutes = useRouteMatch('/superadmin');
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.authenticated?.token);
  const role = useSelector((store) => store.auth.authenticated?.role);

  const sidebarToggler = () => {
    if (employeeRoutes || adminRoutes || superAdminRoutes) dispatch(toggleSidebar(true));
    else dispatch(toggleSidebar(false));
  };

  useEffect(() => {
    sidebarToggler();
    tokenListener();
  }, [location.pathname]);

  useEffect(() => {
    if (token) {
      role === 'EMPLOYEE' && dispatch(getAuthEmployee());
      role === 'ADMIN' && dispatch(getAuthAdmin());
    }
  }, [token]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.mainContainer}>
        {showSidebar && <Sidebar />}
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
