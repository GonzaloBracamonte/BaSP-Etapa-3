import joi from 'joi';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { resetMessage } from 'redux/projects/actions';
import { addProject } from 'redux/thunks/admin';
import { getEmployees } from 'redux/thunks/admin';
import { getAdmins, getSingleAdmin } from 'redux/thunks/super-admin';
import { toggleModal } from 'redux/global/actions';
import styles from './index.module.css';

function NewProject() {
  const id = useSelector((state) => state.auth.user?._id);
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  const showModal = useSelector((state) => state.global.showModal);
  const error = useSelector((state) => state.projects.error);
  const message = useSelector((state) => state.projects.message);
  const employeeList = useSelector((state) => state.employees.list);

  const validationSchema = joi.object({
    projectName: joi
      .string()
      .min(1)
      .max(30)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Project name'),
    description: joi.string().min(10).max(140).allow('').label('Description'),
    isActive: joi.boolean(),
    admin: joi.string().label('Admin').allow(''),
    client: joi
      .string()
      .min(1)
      .max(20)
      .pattern(/^[A-Za-z0-9 ]+$/)
      .required()
      .label('Client'),
    startDate: joi.date().required().label('Start Date'),
    endDate: joi.date().min(joi.ref('startDate')).allow('').label('End Date'),
    employees: joi
      .array()
      .items(
        joi.object({
          employeeId: joi.string().required().label('Employee ID'),
          role: joi.string().valid('DEV', 'QA', 'PM', 'TL').insensitive().required().label('Role'),
          rate: joi.number().min(0).precision(2).required().label('Rate'),
          hoursInProject: joi.number().min(0).precision(1).required().label('Hours In Project')
        })
      )
      .label('Employee')
  });

  useEffect(() => {
    dispatch(getEmployees());
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      projectName: '',
      description: '',
      startDate: '',
      endDate: '',
      admin: '',
      client: '',
      employees: [],
      isActive: true
    },
    resolver: joiResolver(validationSchema)
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employees'
  });

  const formatEmployees = () => {
    return employeeList.map((employee) => {
      return { id: employee._id, text: `${employee.firstName} ${employee.lastName}` };
    });
  };

  const submitHandler = (data) => {
    const project = data;
    project.admin = id;
    dispatch(addProject(data));
    dispatch(toggleModal());
  };

  const closeHandler = () => {
    dispatch(toggleModal());
    dispatch(resetMessage());
    if (!error) {
      goBack();
    }
  };
  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
        <Input
          type="text"
          id="projectName"
          text="Project Name"
          error={errors.projectName}
          register={register}
          onKeyDown={handleSubmit(submitHandler)}
        />
        <Input
          type="text"
          id="description"
          text="Description"
          error={errors.description}
          register={register}
          onKeyDown={handleSubmit(submitHandler)}
        />
        <Input
          type="date"
          id="startDate"
          text="Start Date"
          error={errors.startDate}
          register={register}
          onKeyDown={handleSubmit(submitHandler)}
        />
        <Input
          type="date"
          id="endDate"
          text="End Date"
          error={errors.endDate}
          register={register}
          onKeyDown={handleSubmit(submitHandler)}
        />
        <Input type="text" id="client" text="Client" error={errors.client} register={register} />
        {fields.map((field, index) => (
          <div className={styles.employeeBox} key={field.id}>
            <Select
              text={`Employee ${index + 1}`}
              id={`employees.${index}.employeeId`}
              options={formatEmployees()}
              error={errors.employeeId}
              register={register}
            />
            <Input
              type="text"
              id={`employees.${index}.role`}
              text="Role"
              error={errors.role}
              register={register}
            />
            <Input
              type="number"
              id={`employees.${index}.rate`}
              text="Rate"
              error={errors.rate}
              register={register}
            />
            <Input
              type="number"
              id={`employees.${index}.hoursInProject`}
              text="Hours in project"
              error={errors.hoursInProject}
              register={register}
            />
            <Button classes={'red'} onClick={() => remove(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button onClick={() => append({})}> +Add employee</Button>
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
}

export default NewProject;
