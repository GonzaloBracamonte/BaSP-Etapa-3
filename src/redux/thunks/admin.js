import {
  getAuthenticationError,
  getAuthenticationPending,
  getAuthenticationSuccess
} from 'redux/auth/actions';
import {
  getEmployeesSuccess,
  getEmployeesPending,
  getEmployeesError,
  getSingleEmployeesSuccess,
  getSingleEmployeesPending,
  getSingleEmployeesError,
  addEmployeesSuccess,
  addEmployeesPending,
  addEmployeesError,
  editEmployeesSuccess,
  editEmployeesPending,
  editEmployeesError,
  deleteEmployeesSuccess,
  deleteEmployeesPending,
  deleteEmployeesError
} from 'redux/employees/actions';
import {
  getProjectsSuccess,
  getProjectsPending,
  getProjectsError,
  addProjectPending,
  addProjectSuccess,
  addProjectError,
  editProjectPending,
  editProjectSuccess,
  editProjectError,
  getSingleProjectPending,
  getSingleProjectSuccess,
  getSingleProjectError,
  deleteProjectSuccess,
  deleteProjectPending,
  deleteProjectError
} from 'redux/projects/actions';
import {
  getTimesheetsPending,
  getTimesheetsSuccess,
  getTimesheetsError,
  deleteTimesheetPending,
  deleteTimesheetSuccess,
  deleteTimesheetError,
  addTimesheetError,
  addTimesheetPending,
  addTimesheetSuccess,
  editTimesheetError,
  editTimesheetPending,
  editTimesheetSuccess,
  getSingleTimesheetError,
  getSingleTimesheetPending,
  getSingleTimesheetSuccess
} from 'redux/timesheets/actions';

const url = `${process.env.REACT_APP_API_URL}/admin`;

/**************
  AUTH API
***************/

export const getAuthAdmin = () => {
  const token = sessionStorage.getItem('token');
  return (dispatch) => {
    dispatch(getAuthenticationPending());
    return fetch(`${process.env.REACT_APP_API_URL}/auth/getAdmin`, { headers: { token } })
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
  EMPLOYEES API
***************/

export const getSingleEmployee = (id) => {
  return async (dispatch) => {
    dispatch(getSingleEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/employees/${id}`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleEmployeesSuccess(data))
        : dispatch(getSingleEmployeesError(data.message));
    } catch (error) {
      return dispatch(getSingleEmployeesError(error.message));
    }
  };
};

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/employees`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getEmployeesSuccess(data.data))
        : dispatch(getEmployeesError(data.message));
    } catch (error) {
      return dispatch(getSingleEmployeesError(error));
    }
  };
};

export const addEmployee = (obj) => {
  return async (dispatch) => {
    dispatch(addEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'POST',
        headers: { 'Content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/employees`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(addEmployeesSuccess(data))
        : dispatch(addEmployeesError(data.message));
    } catch (error) {
      return dispatch(addEmployeesError(error));
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

      const response = await fetch(`${url}/employees/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editEmployeesSuccess(data))
        : dispatch(editEmployeesError(data.message));
    } catch (error) {
      return dispatch(editEmployeesError(error));
    }
  };
};

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeesPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', token }
      };

      const response = await fetch(`${url}/employees/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(deleteEmployeesSuccess(id))
        : dispatch(deleteEmployeesError(data.message));
    } catch (error) {
      return dispatch(deleteEmployeesError(error));
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

export const addProject = (obj) => {
  return async (dispatch) => {
    dispatch(addProjectPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'POST',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/projects`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(addProjectSuccess(data.message))
        : dispatch(addProjectError(data.message));
    } catch (error) {
      return dispatch(addProjectError(error.message));
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

export const deleteProject = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', token }
      };

      const response = await fetch(`${url}/projects/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(deleteProjectSuccess(id))
        : dispatch(deleteProjectError(data.message));
    } catch (error) {
      return dispatch(deleteProjectError(error.message));
    }
  };
};

/***************
  TIMESHEETS API
****************/

export const getTimesheets = () => {
  return async (dispatch) => {
    dispatch(getTimesheetsPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/timesheets`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getTimesheetsSuccess(data.data))
        : dispatch(getTimesheetsError(data.message));
    } catch (error) {
      return dispatch(getTimesheetsError(error));
    }
  };
};

export const deleteTimesheet = (id) => {
  return async (dispatch) => {
    dispatch(deleteTimesheetPending());
    try {
      const token = sessionStorage.getItem('token');
      const requestConfig = {
        method: 'DELETE',
        headers: { 'content-type': 'application/json', token }
      };

      const response = await fetch(`${url}/timesheets/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(deleteTimesheetSuccess(id))
        : dispatch(deleteTimesheetError(data.message));
    } catch (error) {
      return dispatch(deleteTimesheetError(error.message));
    }
  };
};

export const getSingleTimesheet = (id) => {
  return async (dispatch) => {
    dispatch(getSingleTimesheetPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/timesheets/${id}`, { headers: { token } });
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

      const response = await fetch(`${url}/timesheets`, requestConfig);
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

      const response = await fetch(`${url}/timesheets/${id}`, requestConfig);
      const data = await response.json();

      return !data.error
        ? dispatch(editTimesheetSuccess(data))
        : dispatch(editTimesheetError(data.message));
    } catch (error) {
      return dispatch(editTimesheetError(error));
    }
  };
};
