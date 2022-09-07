import joi from 'joi';
import { useEffect, useState } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './login.module.css';
import { login } from 'redux/thunks/auth';
import { resetMessage } from 'redux/auth/actions';
import { setHome, toggleSidebar } from 'redux/global/actions';

const loginValidations = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Invalid email`
    }),
  password: joi.string().required().label('Password').min(8).messages({
    'string.empty': `Invalid password`,
    'string.min': `Invalid password`
  })
});

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const message = useSelector((state) => state.auth.message);
  const homePath = useSelector((state) => state.global.homePath);
  const [modalMessage, setModalMessage] = useState(false);
  const error = useSelector((state) => state.auth.error);
  const history = useHistory();
  const superAdminRoutes = useRouteMatch('/superadmin');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(loginValidations),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const changeHome = () => {
    if (sessionStorage.getItem('token')) {
      sessionStorage.getItem('role') === 'EMPLOYEE' && dispatch(setHome('/employee'));
      sessionStorage.getItem('role') === 'ADMIN' && dispatch(setHome('/admin'));
      sessionStorage.getItem('role') === 'SUPER ADMIN' && dispatch(setHome('/superadmin'));
    }
  };

  useEffect(() => reset(), []);

  const submitHandler = (data) => {
    dispatch(login(data));
    setModalMessage(true);
  };

  const closeHandler = () => {
    setModalMessage(false);
    dispatch(resetMessage());
    if (!error) {
      changeHome();
      history.push(homePath);
      !superAdminRoutes && dispatch(toggleSidebar(true));
    }
  };
  return (
    <section className={styles.container}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.formContainer}>
          <div className={styles.form}>
            <h2 className={styles.loginTitle}>Log In</h2>
            <form onSubmit={handleSubmit(submitHandler)}>
              <Input
                type="email"
                id="email"
                text="Email"
                error={errors.email}
                register={register}
                onKeyDown={handleSubmit(submitHandler)}
              />
              <Input
                type="password"
                id="password"
                text="Password"
                error={errors.password}
                register={register}
                onKeyDown={handleSubmit(submitHandler)}
              />
              <div className={styles.buttonContainer}>
                <Button classes={'red'} onClick={() => history.push(homePath)}>
                  Back
                </Button>
                <Button>Log in</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      <Modal handleClose={() => closeHandler()} isOpen={modalMessage} isConfirmation={false}>
        <h2>{message ? message : 'Login...'}</h2>
      </Modal>
      <p className={styles.text}>
        Do you not have an account?{' '}
        <Link to="/auth/register" className={styles.link}>
          Sign up
        </Link>
      </p>
    </section>
  );
}

export default Login;
