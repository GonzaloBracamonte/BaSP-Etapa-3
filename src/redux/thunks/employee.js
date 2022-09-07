import {
  getSingleEmployeesSuccess,
  getSingleEmployeesPending,
  getSingleEmployeesError,
  editEmployeesSuccess,
  editEmployeesPending,
  editEmployeesError
} from 'redux/employees/actions';
import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsError,
  editProjectPending,
  editProjectSuccess,
  editProjectError,
  getSingleProjectPending,
  getSingleProjectSuccess,
  getSingleProjectError
} from 'redux/projects/actions';
import {
  getSingleTimesheetPending,
  getSingleTimesheetSuccess,
  getSingleTimesheetError,
  getTimesheetsByEmployeePending,
  getTimesheetsByEmployeeSuccess,
  getTimesheetsByEmployeeError,
  addTimesheetError,
  addTimesheetPending,
  addTimesheetSuccess,
  editTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess
} from 'redux/timesheets/actions';
import {
  getTasksPending,
  getTasksSuccess,
  getTasksFailed,
  getSingleTaskPending,
  getSingleTaskSuccess,
  getSingleTaskFailed,
  addTaskPending,
  addTaskSuccess,
  addTaskFailed,
  editTaskPending,
  editTaskSuccess,
  editTaskFailed,
  deleteTaskPending,
  deleteTaskSuccess,
  deleteTaskFailed
} from 'redux/tasks/actions';
import {
  getAuthenticationError,
  getAuthenticationPending,
  getAuthenticationSuccess
} from 'redux/auth/actions';

const url = `${process.env.REACT_APP_API_URL}/employee`;

/**************
  AUTH API
***************/

export const getAuthEmployee = () => {
  const token = sessionStorage.getItem('token');
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    return fetch(`${process.env.REACT_APP_API_URL}/auth/getEmployee`, { headers: { token } })
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAuthenticationSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAuthenticationError(error));
      });
  };
};

/**************
  EMPLOYEE API
***************/

export const getSingleEmployee = (id) => {
  return async (dispatch) => {
    dispatch(getSingleEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/${id}`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleEmployeesSuccess(data))
        : dispatch(getSingleEmployeesError(data.message));
    } catch (error) {
      return dispatch(getSingleEmployeesError(error.message));
    }
  };
};

export const editEmployees = (obj, id) => {
  return async (dispatch) => {
    dispatch(editEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editEmployeesSuccess(data))
        : dispatch(editEmployeesError(data.message));
    } catch (error) {
      return dispatch(editEmployeesError(error));
    }
  };
};

/*************
  PROJECTS API
**************/

export const getProjects = () => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/projects`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getProjectsSuccess(data.data))
        : dispatch(getProjectsError(data.message));
    } catch (error) {
      return dispatch(getProjectsError(error.message));
    }
  };
};

export const getSingleProject = (id) => {
  return async (dispatch) => {
    dispatch(getSingleProjectPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/projects/${id}`, { headers: { token } });
      const data = await response.json();
      return !data.error
        ? dispatch(getSingleProjectSuccess(data.data))
        : dispatch(getSingleProjectError(data.message));
    } catch (error) {
      return dispatch(getSingleProjectError(error.message));
    }
  };
};

export const editProject = (obj, id) => {
  return async (dispatch) => {
    dispatch(editProjectPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/projects/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editProjectSuccess(data.message))
        : dispatch(editProjectError(data.message));
    } catch (error) {
      return dispatch(editProjectError(error.message));
    }
  };
};

/***************
  TIMESHEETS API
****************/

export const getEmployeeTimesheets = (employee) => {
  return async (dispatch) => {
    dispatch(getTimesheetsByEmployeePending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/timesheet/get-by-employee/${employee}`, {
        headers: { token }
      });
      const data = await response.json();

      return !data.error
        ? dispatch(getTimesheetsByEmployeeSuccess(data))
        : dispatch(getTimesheetsByEmployeeError(data.message));
    } catch (error) {
      return dispatch(getTimesheetsByEmployeeError(error));
    }
  };
};

export const getSingleTimesheet = (id) => {
  return async (dispatch) => {
    dispatch(getSingleTimesheetPending());
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`${url}/timesheet/${id}`, {
        headers: { token }
      });
      const data = await response.json();
      return !data.error
        ? dispatch(getSingleTimesheetSuccess(data))
        : dispatch(getSingleTimesheetError(data.message));
    } catch (error) {
      return dispatch(getSingleTimesheetError(error));
    }
  };
};

export const addTimesheet = (timesheet) => {
  return async (dispatch) => {
    dispatch(addTimesheetPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(timesheet)
      };

      const response = await fetch(`${url}/timesheet`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(addTimesheetSuccess(data))
        : dispatch(addTimesheetError(data.message));
    } catch (error) {
      return dispatch(addTimesheetError(error));
    }
  };
};

export const editTimesheet = (timesheet, id) => {
  return async (dispatch) => {
    dispatch(editTimesheetPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(timesheet)
      };

      const response = await fetch(`${url}/timesheet/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editTimesheetSuccess(data))
        : dispatch(editTimesheetError(data.message));
    } catch (error) {
      return dispatch(editTimesheetError(error));
    }
  };
};

/**********
  TASKS API
***********/

export const getTasks = () => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/tasks`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getTasksSuccess(data.data))
        : dispatch(getTasksFailed(data.message));
    } catch (error) {
      return dispatch(getTasksFailed(error));
    }
  };
};

export const getSingleTask = (id) => {
  return async (dispatch) => {
    dispatch(getSingleTaskPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/tasks/${id}`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleTaskSuccess(data))
        : dispatch(getSingleTaskFailed(data.message));
    } catch (error) {
      return dispatch(getSingleTaskFailed(error));
    }
  };
};

export const addTask = (obj) => {
  return async (dispatch) => {
    dispatch(addTaskPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/tasks`, requestConfig);
      const data = await response.json();

      return !data.error ? dispatch(addTaskSuccess(data)) : dispatch(addTaskFailed(data.message));
    } catch (error) {
      return dispatch(addTaskFailed(error));
    }
  };
};

export const editTask = (object, id) => {
  return async (dispatch) => {
    dispatch(editTaskPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'PUT',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(object)
      };

      const response = await fetch(`${url}/tasks/${id}`, requestConfig);
      const data = await response.json();

      return !data.error ? dispatch(editTaskSuccess(data)) : dispatch(editTaskFailed(data.message));
    } catch (error) {
      return dispatch(editTaskFailed(error));
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    dispatch(deleteTaskPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', token }
      };

      const response = await fetch(`${url}/tasks/${id}`, requestConfig);
      const data = await response.json();

      !data.error ? dispatch(deleteTaskSuccess(id)) : dispatch(deleteTaskFailed(data.message));
    } catch (error) {
      dispatch(deleteTaskFailed(error));
    }
  };
};
