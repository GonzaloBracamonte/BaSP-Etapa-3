import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import { addAdmin, editAdmin, getSingleAdmin } from 'redux/admins/thunks';
import { resetAdmin, resetMessage, setModal } from 'redux/admins/actions';

import Modal from 'Components/Shared/Modal/Index';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './admins.module.css';

const Admins = () => {
  const { id } = useParams();
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admins.admin);
  const error = useSelector((state) => state.admins.error);
  const message = useSelector((state) => state.admins.message);
  const showModal = useSelector((state) => state.admins.showModal);
  const adminValidate = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(4)
      .max(15)
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('Last Name')
      .min(4)
      .max(15)
      .required(),
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().label('password').min(8).required(),
    isActive: Joi.boolean()
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(adminValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isActive: false
    }
  });

  useEffect(() => {
    id && dispatch(getSingleAdmin(id));
    return () => dispatch(resetAdmin());
  }, []);

  useEffect(() => {
    reset(admin);
  }, [admin]);

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  // === Handle submit data and method === //
  const submitHandler = (data) => {
    if (id) {
      dispatch(editAdmin(data, id));
    } else {
      dispatch(addAdmin(data));
    }
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <Input
          id={'firstName'}
          register={register}
          text={'First Name'}
          type={'text'}
          error={errors.firstName}
        />
        <Input
          id={'lastName'}
          register={register}
          text={'Last Name'}
          type={'text'}
          error={errors.lastName}
        />
        <Input
          id={'email'}
          register={register}
          text={'Email'}
          type={'email'}
          error={errors.email}
        />
        <Input
          id={'password'}
          register={register}
          text={'Password'}
          type={'password'}
          error={errors.password}
        />
        <Input
          id={'isActive'}
          register={register}
          text={'Is Active?'}
          type={'checkbox'}
          error={errors.checkbox}
        />
        <div className={styles.btnsContainer}>
          <Button classes={'red'} onClick={() => goBack()}>
            Back
          </Button>
          <Button>Save</Button>
        </div>
      </form>
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default Admins;
