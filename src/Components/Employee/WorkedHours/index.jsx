import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'Components/Shared/Modal';
import Loading from 'Components/Shared/Loading';
import styles from './index.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import {
  getEmployeeTimesheets,
  getSingleEmployee,
  getTasks,
  addTimesheet,
  editTimesheet,
  getSingleTimesheet
} from 'redux/thunks/employee';
import { resetMessage, resetTimesheet } from 'redux/timesheets/actions';
import { useForm } from 'react-hook-form';
import Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import {
  endOfWeekWithOptions,
  startOfWeekWithOptions,
  format,
  add,
  sub,
  eachDayOfInterval
} from 'date-fns/esm/fp';
import { isBefore } from 'date-fns';

const timeSheetValidate = Joi.object({
  workedHours: Joi.number().positive().required().label('Worked Hours').messages({
    'string.empty': `Worked Hours cannot be empty`
  }),

  task: Joi.string().label('Task').messages({
    'string.empty': `Task cannot be an empty field`
  }),

  description: Joi.string().allow('').label('Description').min(0).messages({
    'string.empty': `Description cannot be an empty field`
  })
});

const HoursForm = () => {
  const id = useSelector((state) => state.auth.user._id);
  const todayDate = new Date();
  const [startWeekDay, setStartWeekDay] = useState();
  const [endWeekDay, setEndWeekDay] = useState();
  const [week, setWeek] = useState({});
  const [listData, setListData] = useState([]);
  const [daysOfWeek, setDaysofWeek] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [showModalForm, setShowModalForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [timesheetShowData, setTimesheetShowData] = useState({
    project: '',
    role: '',
    date: ''
  });
  const [timesheetReqData, setTimesheetReqData] = useState({});
  const [timesheetId, setTimesheetId] = useState(null);
  const dispatch = useDispatch();
  const timesheetsList = useSelector((state) => state.timesheet.list);
  const timesheet = useSelector((state) => state.timesheet.timesheet);
  const tasks = useSelector((state) => state.tasks.list);
  const isLoadingTimesheet = useSelector((state) => state.timesheet.isLoading);
  const isLoadingList = useSelector((state) => state.employees.isLoading);
  const employee = useSelector((state) => state.employees.employee);
  const message = useSelector((state) => state.timesheet.message);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onBlur',
    resolver: joiResolver(timeSheetValidate),
    defaultValues: {
      task: '',
      workedHours: '',
      description: ''
    }
  });

  useEffect(() => {
    if (id) {
      dispatch(getSingleEmployee(id));
      dispatch(getEmployeeTimesheets(id));
      getCurrentWeek(todayDate);
    }
    dispatch(getTasks());
  }, []);

  useEffect(() => {
    formatListData(employee?.assignedProjects || [], timesheetsList, daysOfWeek);
  }, [timesheetsList, week]);

  useEffect(() => {
    const formatedTimesheet = formatTimesheet(timesheet);
    reset(formatedTimesheet);
  }, [timesheet]);

  const formatListData = (projects, filteredTimesheets, daysOfWeek) => {
    const formatedWeek = formatDaysOfWeek(daysOfWeek);
    let hoursForeachProject = [];
    const dataList = projects.map((project) => {
      const role = getRole(project);
      const rate = getRate(project);
      const weekTimesheets = getWeekTimesheets(filteredTimesheets, project, formatedWeek);
      const totalHours = weekTotalHours(weekTimesheets.workedHours);
      hoursForeachProject.push(totalHours);
      return {
        id: project._id,
        projectName: project.projectName,
        role: role,
        rate: rate,
        monday: {
          workedHours: weekTimesheets.workedHours[0],
          id: weekTimesheets.timesheets[0]
        },
        tuesday: {
          workedHours: weekTimesheets.workedHours[1],
          id: weekTimesheets.timesheets[1]
        },
        wednesday: {
          workedHours: weekTimesheets.workedHours[2],
          id: weekTimesheets.timesheets[2]
        },
        thursday: {
          workedHours: weekTimesheets.workedHours[3],
          id: weekTimesheets.timesheets[3]
        },
        friday: {
          workedHours: weekTimesheets.workedHours[4],
          id: weekTimesheets.timesheets[4]
        },
        saturday: {
          workedHours: weekTimesheets.workedHours[5],
          id: weekTimesheets.timesheets[5]
        },
        sunday: {
          workedHours: weekTimesheets.workedHours[6],
          id: weekTimesheets.timesheets[6]
        },
        totalHours: totalHours
      };
    });
    setListData(dataList);
    setTotalHours(weekTotalHours(hoursForeachProject));
  };

  const getWeekTimesheets = (filteredTimesheets, project, formatedWeek) => {
    let weekTimesheetsWorkedHours = [0, 0, 0, 0, 0, 0, 0];
    let weekTimesheetsId = [null, null, null, null, null, null, null];
    filteredTimesheets.forEach((timesheet) => {
      if (timesheet.project?._id === project._id) {
        const timesheetDate = format('dd/MM/yyyy', new Date(timesheet.date));
        for (let i = 0; i < formatedWeek.length; i++) {
          if (timesheetDate === formatedWeek[i]) {
            weekTimesheetsWorkedHours[i] = timesheet.workedHours;
            weekTimesheetsId[i] = timesheet._id;
          }
        }
      }
    });
    return { workedHours: weekTimesheetsWorkedHours, timesheets: weekTimesheetsId };
  };

  const getRole = (project) => {
    let role = '';
    for (let i = 0; i < project.employees.length; i++) {
      if (project.employees[i].employeeId === id) {
        role = project.employees[i].role;
      }
    }
    return role;
  };

  const getRate = (project) => {
    let rate = 0;
    for (let i = 0; i < project.employees.length; i++) {
      if (project.employees[i].employeeId === id) {
        rate = project.employees[i].rate;
      }
    }
    return rate;
  };

  const weekTotalHours = (weekTimesheets) => {
    const initialValue = 0;
    const sumWithInitial = weekTimesheets.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      initialValue
    );
    return sumWithInitial;
  };

  const getCurrentWeek = (todayDate) => {
    const startofWeek = startOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    const endofWeek = endOfWeekWithOptions({ weekStartsOn: 1 }, todayDate);
    setStartWeekDay(startofWeek);
    setEndWeekDay(endofWeek);
    setDaysofWeek(eachDayOfInterval({ start: startofWeek, end: endofWeek }));
    const formatedStart = format('dd/MM/yyyy', startofWeek);
    const formatedEnd = format('dd/MM/yyyy', endofWeek);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const nextWeek = (start, end) => {
    const newStartDate = add({ days: 7 }, start);
    const newEndDate = add({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysofWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const prevWeek = (start, end) => {
    const newStartDate = sub({ days: 7 }, start);
    const newEndDate = sub({ days: 7 }, end);
    setStartWeekDay(newStartDate);
    setEndWeekDay(newEndDate);
    setDaysofWeek(eachDayOfInterval({ start: newStartDate, end: newEndDate }));
    const formatedStart = format('dd/MM/yyyy', newStartDate);
    const formatedEnd = format('dd/MM/yyyy', newEndDate);
    setWeek({
      startDate: formatedStart,
      endDate: formatedEnd
    });
  };

  const formatDaysOfWeek = (days) => {
    const formatedWeek = days.map((date) => {
      return format('dd/MM/yyyy', date);
    });
    return formatedWeek;
  };

  const formatTasks = () => {
    return tasks.map((task) => {
      return { id: task._id, text: task.title };
    });
  };

  const formatTimesheet = (timesheet) => {
    return {
      task: timesheet?.task,
      description: timesheet?.description,
      workedHours: timesheet?.workedHours
    };
  };

  const headers = [
    { header: 'Project Name', key: 'projectName', style: false },
    { header: 'Role', key: 'role', style: false },
    { header: 'Monday', key: 'monday', style: true, date: daysOfWeek[0] },
    { header: 'Tuesday', key: 'tuesday', style: true, date: daysOfWeek[1] },
    { header: 'Wednesday', key: 'wednesday', style: true, date: daysOfWeek[2] },
    { header: 'Thursday', key: 'thursday', style: true, date: daysOfWeek[3] },
    { header: 'Friday', key: 'friday', style: true, date: daysOfWeek[4] },
    { header: 'Saturday', key: 'saturday', style: true, date: daysOfWeek[5] },
    { header: 'Sunday', key: 'sunday', style: true, date: daysOfWeek[6] },
    { header: 'Total Hours', key: 'totalHours', style: false }
  ];

  const closeHandlerForm = () => {
    reset();
    dispatch(resetTimesheet());
    setShowModalForm(false);
  };

  const closeHandlerModal = () => {
    dispatch(getEmployeeTimesheets(id));
    dispatch(resetMessage());
    dispatch(resetTimesheet());
    setShowModal(false);
  };

  const submitHandler = (data) => {
    const reqData = {
      ...timesheetReqData,
      ...data
    };
    if (timesheetId) {
      dispatch(editTimesheet(reqData, timesheetId));
    } else {
      dispatch(addTimesheet(reqData));
    }
    setShowModal(true);
    reset();
    setShowModalForm(false);
  };

  const openModalHandler = (data, header) => {
    dispatch(resetMessage());
    const _id = data[header.key].id;
    setTimesheetId(_id);
    if (_id) {
      dispatch(getSingleTimesheet(_id));
    }
    setTimesheetShowData({
      project: data.projectName,
      role: data.role,
      date: format('dd/MM/yyyy', header.date)
    });
    setTimesheetReqData({
      employee: id,
      project: data.id,
      role: data.role,
      rate: data.rate,
      date: header.date
    });
    setShowModalForm(true);
  };

  return (
    <section className={styles.container}>
      <h2>Worked Hours</h2>
      <div className={styles.topContainer}>
        <Button onClick={() => prevWeek(startWeekDay, endWeekDay)}>{'<'}</Button>
        <p className={styles.weekText}>
          {week?.startDate} - {week?.endDate}
        </p>
        <Button onClick={() => nextWeek(startWeekDay, endWeekDay)}>{'>'}</Button>
      </div>
      {isLoadingList ? (
        <Loading />
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                {headers.map((header, index) => {
                  return (
                    <th key={index} className={styles.th}>
                      {header.header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listData.map((row) => {
                return (
                  <tr key={row.id} className={styles.rows}>
                    {headers.map((header, index) => {
                      return (
                        <td
                          key={index}
                          className={header.style ? styles.timesheetTd : styles.td}
                          onClick={() => {
                            if (header.style && isBefore(header.date, todayDate)) {
                              openModalHandler(row, header);
                            }
                          }}
                        >
                          {header.style ? row[header.key].workedHours : row[header.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h2 className={styles.totalText}>Total: {totalHours}</h2>
        </>
      )}
      {
        <Modal isOpen={showModalForm} isConfirmation={false} handleClose={() => closeHandlerForm()}>
          <h2 className={styles.modalText}>Timesheet</h2>
          <label className={styles.label}>Project: {timesheetShowData.project}</label>
          <label className={styles.label}>Role: {timesheetShowData.role}</label>
          <label className={styles.label}>Date: {timesheetShowData.date}</label>
          {isLoadingTimesheet ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <Select
                id={'task'}
                text={'Task'}
                options={formatTasks()}
                register={register}
                error={errors.task}
              />
              <Input
                id={'description'}
                type={'text'}
                text={'Description'}
                register={register}
                error={errors.description}
              />
              <Input
                id={'workedHours'}
                text={'Worked Hours'}
                type={'number'}
                register={register}
                error={errors.workedHours}
              />
              <Button>Save</Button>
            </form>
          )}
        </Modal>
      }
      <Modal isOpen={showModal} isConfirmation={false} handleClose={() => closeHandlerModal()}>
        <h2 className={styles.modalText}>{message}</h2>
      </Modal>
    </section>
  );
};

export default HoursForm;
