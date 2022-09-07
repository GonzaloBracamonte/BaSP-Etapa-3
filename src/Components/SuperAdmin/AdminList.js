import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './adminsList.module.css';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdmin, getAdmins } from 'redux/thunks/super-admin';
import { resetMessage } from 'redux/superadmin/actions';
import { toggleModal } from 'redux/global/actions';

const AdminsList = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.superAdmin.adminList);
  const isLoading = useSelector((state) => state.superAdmin.isLoading);
  const message = useSelector((state) => state.superAdmin.message);
  const [confirmation, setConfirmation] = useState(true);
  const showModal = useSelector((state) => state.global.showModal);
  const [id, setId] = useState('');

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' }
  ];

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteAdmin(id));
  };

  const closeHandler = () => {
    dispatch(toggleModal(false));
    dispatch(resetMessage());
    setConfirmation(true);
  };

  const formatListData = (responseData) => {
    const data = responseData.map((admin) => {
      return {
        id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        email: admin.email,
        isActive: admin.isActive
      };
    });
    return data;
  };

  return isLoading ? (
    <>
      <h2>Admins</h2>
      <Loading />
    </>
  ) : (
    <section className={styles.container}>
      <h2>List of Admins</h2>
      <List
        data={formatListData(list)}
        resource={'/superadmin/form'}
        headers={headers}
        deleteItem={(id) => {
          setId(id);
          dispatch(toggleModal(true));
        }}
        showButtons={true}
      />
      <div>
        <Link to={'/superadmin/add-admin'} className={styles.linkReset}>
          <Button classes="block">Create Admin</Button>
        </Link>
      </div>
      <Modal
        handleClose={confirmation ? () => dispatch(toggleModal(false)) : () => closeHandler()}
        isOpen={showModal}
        isConfirmation={confirmation}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this admin?' : message}</h2>
      </Modal>
    </section>
  );
};

export default AdminsList;
