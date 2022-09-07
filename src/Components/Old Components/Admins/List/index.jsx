import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admins.module.css';
import List from 'Components/Shared/List';
import Button from 'Components/Shared/Button';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdmin, getAdmins } from 'redux/admins/thunks';
import { resetMessage, setModal } from 'redux/employees/actions';

const Admins = () => {
  const dispatch = useDispatch();
  const serverPath = '/admins';
  const list = useSelector((state) => state.admins.list);
  const isLoading = useSelector((state) => state.admins.isLoading);
  const message = useSelector((state) => state.admins.message);
  const [confirmation, setConfirmation] = useState(true);
  const showModal = useSelector((state) => state.admins.showModal);
  const [id, setId] = useState('');

  const headers = [
    { header: 'First name', key: 'firstName' },
    { header: 'Last name', key: 'lastName' },
    { header: 'Email', key: 'email' },
    { header: 'is Active?', key: 'isActive' }
  ];

  useEffect(() => {
    dispatch(getAdmins());
  }, []);

  const confirmationHandler = () => {
    setConfirmation(false);
    dispatch(deleteAdmin(id));
  };

  const closeHandler = () => {
    dispatch(setModal(false));
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
        isActive: admin.isActive.toString()
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
      <h2>Admins</h2>
      <List
        data={formatListData(list)}
        headers={headers}
        resource={serverPath}
        deleteItem={(id) => {
          setId(id);
          dispatch(setModal(true));
        }}
        showButtons={true}
      />
      <div>
        <Link to={'/admins/form'} className={styles.linkReset}>
          <Button classes="block">Create Admin</Button>
        </Link>
      </div>
      <Modal
        handleClose={confirmation ? () => dispatch(setModal(false)) : () => closeHandler()}
        isOpen={showModal}
        isConfirmation={confirmation}
        confirmed={() => confirmationHandler()}
      >
        <h2>{confirmation ? 'Are you sure you want to delete this admin?' : message}</h2>
      </Modal>
    </section>
  );
};

export default Admins;
