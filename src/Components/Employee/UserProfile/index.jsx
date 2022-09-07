import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetMessage } from 'redux/employees/actions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Loading from 'Components/Shared/Loading';
import Modal from 'Components/Shared/Modal';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import styles from './index.module.css';
import Joi from 'joi';

const EmployeeProfile = () => {
  const { goBack } = useHistory();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const validationSchema = Joi.object({
    firstName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('First Name')
      .min(3)
      .max(20)
      .messages({
        'string.pattern.base': `First Name should only have letters`
      })
      .required(),
    lastName: Joi.string()
      .pattern(/^[a-zA-Z ]+$/)
      .label('Last Name')
      .min(3)
      .max(20)
      .messages({
        'string.pattern.base': `Last Name should only have letters`
      })
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    repeatEmail: Joi.string().label('Repeat Email').required().valid(Joi.ref('email')),
    password: Joi.string().label('Password').min(8).required(),
    repeatPassword: Joi.string().label('Repeat Password').required().valid(Joi.ref('password')),
    secretWord: Joi.string().label('Secret Word').min(8).required(),
    repeatSecretWord: Joi.string()
      .label('Repeat Secret Word')
      .required()
      .valid(Joi.ref('secretWord')),
    address: Joi.string().label('Address').min(8).required(),
    birthDate: Joi.date().label('Birth Date').required().max(Date.now())
  });

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      repeatEmail: '',
      password: '',
      repeatPassword: '',
      secretWord: '',
      repeatSecretWord: '',
      address: '',
      birthDate: ''
    },
    mode: 'onBlur',
    resolver: joiResolver(validationSchema)
  });

  const closeHandler = () => {
    setShowModal(false);
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = (data) => {
    if (data) setShowModal(true);
  };

  return (
    <section className={styles.container}>
      <h2>User Profile</h2>
      {isLoading ? (
        <Loading />
      ) : (
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
            text={'Last Name'}
            type={'text'}
            register={register}
            error={errors.lastName}
          />
          <Input
            id={'email'}
            text={'Email'}
            type={'email'}
            register={register}
            error={errors.email}
          />
          <Input
            id={'repeatEmail'}
            text={'Repeat Email'}
            type={'email'}
            register={register}
            error={errors.repeatEmail}
          />
          <Input
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
          <Input
            id={'repeatPassword'}
            text={'Repeat Password'}
            type={'password'}
            register={register}
            error={errors.repeatPassword}
          />
          <Input
            id={'secretWord'}
            text={'Secret Word'}
            type={'password'}
            register={register}
            error={errors.secretWord}
          />
          <Input
            id={'repeatSecretWord'}
            text={'Repeat Secret Word'}
            type={'password'}
            register={register}
            error={errors.repeatSecretWord}
          />
          <Input
            id={'address'}
            text={'Address'}
            type={'text'}
            register={register}
            error={errors.address}
          />
          <Input
            id={'birthDate'}
            text={'Birth Date'}
            type={'date'}
            register={register}
            error={errors.birthDate}
          />
          <div className={styles.btnsContainer}>
            <Button classes={'red'} onClick={() => goBack()}>
              Back
            </Button>
            <Button>Save</Button>
          </div>
        </form>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={showModal} isConfirmation={false}>
        <h2>User Profile successfully updated</h2>
      </Modal>
    </section>
  );
};

export default EmployeeProfile;
