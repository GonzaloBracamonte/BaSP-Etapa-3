import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { resetEmployee, resetMessage, setModal } from 'redux/employees/actions';
import { getSingleEmployee, addEmployee, editEmployees } from 'redux/employees/thunks';
import { getProjects } from 'redux/projects/thunks';
import Joi, { allow } from 'joi';

import Modal from 'Components/Shared/Modal/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './employee.module.css';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';

const employeeValidate = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('First Name')
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.pattern.base': `First Name" should only have letters`,
      'string.empty': `First Name cannot be an empty field`,
      'string.max': `First name should have a maximum length of 10`,
      'string.min': `First name should have a minimum length of 3`
    }),
  lastName: Joi.string()
    .pattern(/^[a-zA-Z ]+$/)
    .label('Last Name')
    .min(3)
    .max(10)
    .required()
    .messages({
      'string.pattern.base': `Last Name" should only have letters`,
      'string.empty': `Last Name cannot be an empty field`,
      'string.max': `Last name should have a maximum length of 10`,
      'string.min': `Last name should have a minimum length of 3`
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .messages({
      'string.empty': `Email cannot be an empty field`
    }),
  password: Joi.string().label('Password').min(8).required().messages({
    'string.empty': `Password cannot be an empty field`,
    'string.min': `Password should have a minimum length of 8`
  }),
  assignedProjects: Joi.string().allow('').label('Project'),
  isActive: Joi.boolean()
});

const EmployeesForm = () => {
  const { goBack } = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);
  const isLoading = useSelector((state) => state.employees.isLoading);
  const error = useSelector((state) => state.employees.error);
  const message = useSelector((state) => state.employees.message);
  const projectList = useSelector((state) => state.projects.list);
  const showModal = useSelector((state) => state.tasks.showModal);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(employeeValidate),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      assignedProjects: [],
      isActive: false
    }
  });

  useEffect(() => {
    id && dispatch(getSingleEmployee(id));
    dispatch(getProjects());
    return () => dispatch(resetEmployee());
  }, []);

  useEffect(() => {
    reset(employee);
  }, [employee]);

  const formatProjects = () => {
    return projectList.map((project) => {
      return { id: project._id, text: project.projectName };
    });
  };

  const closeHandler = () => {
    dispatch(setModal(false));
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };

  const submitHandler = (data) => {
    if (id) {
      dispatch(editEmployees(data, id));
    } else {
      dispatch(addEmployee(data));
    }
    dispatch(setModal(true));
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
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
            id={'password'}
            text={'Password'}
            type={'password'}
            register={register}
            error={errors.password}
          />
          <Select
            id={'assignedProjects'}
            text={'Projects'}
            options={formatProjects()}
            register={register}
            error={errors.assignedProjects}
          />
          <Input
            id={'isActive'}
            type={'checkbox'}
            text={'Is Active?'}
            register={register}
            error={errors.isActive}
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
        <h2>{message}</h2>
      </Modal>
    </section>
  );
};

export default EmployeesForm;
