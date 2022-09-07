import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSingleEmployee } from 'redux/thunks/employee';
import List from 'Components/Shared/List';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';

const EmployeeProjects = () => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user._id);
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const headers = [
    { header: 'Project Name', key: 'projectName' },
    { header: 'Client', key: 'client' },
    { header: 'Start Date', key: 'startDate' },
    { header: 'End Date', key: 'endDate' }
  ];

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
  }, []);

  const formatListData = (responseData) => {
    const data = responseData.map((project) => {
      return {
        id: project._id,
        startDate: project.startDate.slice(0, 10),
        endDate: project.endDate.slice(0, 10),
        projectName: project.projectName,
        client: project.client
      };
    });
    return data;
  };

  return (
    <section className={styles.container}>
      <h2>My Projects</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <List
          data={formatListData(employee?.assignedProjects || [])}
          headers={headers}
          showButtons={false}
        />
      )}
    </section>
  );
};

export default EmployeeProjects;
