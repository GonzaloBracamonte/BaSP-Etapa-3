import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTimesheets, deleteTimesheet } from 'redux/timesheets/thunks';
import { resetMessage, setModal, updateList } from 'redux/timesheets/actions';
import List from 'Components/Shared/List';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';

const TimeSheets = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.timesheet.list);
  const isLoading = useSelector((state) => state.timesheet.isLoading);
  const message = useSelector((state) => state.timesheet.message);
  const showModal = useSelector((state) => state.timesheet.showModal);
  const [confirmation, setConfirmation] = useState(true);
  const [id, setId] = useState('');

  useEffect(() => dispatch(getTimesheets()), []);

  const formatListData = (responseData) => {
    const data = responseData.map((timeSheet) => {
      return {
        id: timeSheet._id,
        date: timeSheet.date.substring(0, 10),
        employee: timeSheet.employee
          ? timeSheet.employee.firstName + ' ' + timeSheet.employee.lastName
          : '',
        project: timeSheet.project ? timeSheet.project.projectName : '',
        role: timeSheet.role,
        task: timeSheet.task ? timeSheet.task.title : ''
      };
    });
    return data;
  };

  const headers = [
    { header: 'Date', key: 'date' },
    { header: 'Employee', key: 'employee' },
    { header: 'Project', key: 'project' },
    { header: 'Role', key: 'role' },
    { header: 'Task', key: 'task' }
  ];

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteTimesheet(id));
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <section className={styles.container}>
      <h2>Timesheets</h2>
      <List
        data={formatListData(list)}
        headers={headers}
        resource={'/timesheets'}
        deleteItem={(id) => {
          setId(id);
          dispatch(setModal(true));
        }}
        showButtons={true}
      />
      <div>
        <Link to={'/timesheets/form'} className={styles.LinkReset}>
          <Button classes="block">Create Timesheet</Button>
        </Link>
      </div>
      <Modal
        isOpen={showModal}
        isConfirmation={confirmation}
        handleClose={confirmation ? () => dispatch(setModal(false)) : () => closeHandler()}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this timesheet?' : message}</h2>
      </Modal>
    </section>
  );
};

export default TimeSheets;
