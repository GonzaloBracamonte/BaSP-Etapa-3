import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from 'redux/global/actions';
import styles from './sidebar.module.css';

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [links, setLinks] = useState([]);
  const [title, setTitle] = useState('');
  const employeeLinks = [
    { link: '/employee', title: 'Home' },
    { link: '/employee/projects', title: 'My Projects' },
    { link: '/employee/profile', title: 'User Profile' },
    { link: '/employee/workedhours', title: 'Work Hours' }
  ];
  const adminLinks = [
    { link: '/admin', title: 'Home' },
    { link: '/admin/projects', title: 'All Projects' },
    { link: '/admin/projects/add', title: 'Create Project' },
    { link: '/admin/employees', title: 'Employees' },
    { link: '/admin/reports', title: 'Report' }
  ];
  const superAdminLinks = [
    { link: '/superadmin', title: 'Home' },
    { link: '/superadmin/list', title: 'List of Admins' },
    { link: '/superadmin/add-admin', title: 'Create Admin' }
  ];

  const setSidebarValues = () => {
    if (location.pathname.includes('/employee')) {
      setTitle('Employee');
      setLinks(employeeLinks);
    } else if (location.pathname.includes('/admin')) {
      setTitle('Admin');
      setLinks(adminLinks);
    } else if (location.pathname.includes('/superadmin')) {
      setTitle('Super Admin');
      setLinks(superAdminLinks);
    } else {
      dispatch(toggleSidebar(false));
    }
  };

  useEffect(() => setSidebarValues(), [location.pathname]);

  return (
    <aside className={styles.aside}>
      <p>{title}</p>
      <nav>
        <ul className={styles.navList}>
          {links.map((link, index) => {
            return (
              <NavLink to={link.link} exact key={index} activeClassName={styles.currentLink}>
                <li>{link.title}</li>
              </NavLink>
            );
          })}
          <NavLink to="#">
            <li>Help</li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
