import {
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  ADD_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  GET_SINGLE_TIMESHEET_PENDING,
  GET_SINGLE_TIMESHEET_SUCCESS,
  GET_SINGLE_TIMESHEET_ERROR,
  GET_TIMESHEETS_BY_EMPLOYEE_PENDING,
  GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS,
  GET_TIMESHEETS_BY_EMPLOYEE_ERROR,
  RESET_TIMESHEET,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR,
  RESET_MESSAGE
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const getTimesheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getSingleTimesheetPending = () => {
  return {
    type: GET_SINGLE_TIMESHEET_PENDING
  };
};

export const getSingleTimesheetSuccess = (data) => {
  return {
    type: GET_SINGLE_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const getSingleTimesheetError = (error) => {
  return {
    type: GET_SINGLE_TIMESHEET_ERROR,
    payload: error
  };
};

export const getTimesheetsByEmployeePending = () => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_PENDING };
};

export const getTimesheetsByEmployeeSuccess = (data) => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS, payload: data };
};

export const getTimesheetsByEmployeeError = (error) => {
  return { type: GET_TIMESHEETS_BY_EMPLOYEE_ERROR, payload: error };
};

export const addTimesheetPending = () => {
  return {
    type: ADD_TIMESHEET_PENDING
  };
};

export const addTimesheetSuccess = (data) => {
  return {
    type: ADD_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const addTimesheetError = (error) => {
  return {
    type: ADD_TIMESHEET_ERROR,
    payload: error
  };
};

export const deleteTimesheetPending = () => {
  return {
    type: DELETE_TIMESHEET_PENDING
  };
};

export const deleteTimesheetSuccess = (id) => {
  return {
    type: DELETE_TIMESHEET_SUCCESS,
    payload: id
  };
};

export const deleteTimesheetError = (error) => {
  return {
    type: DELETE_TIMESHEET_ERROR,
    payload: error
  };
};

export const editTimesheetPending = () => {
  return {
    type: EDIT_TIMESHEET_PENDING
  };
};

export const editTimesheetSuccess = (data) => {
  return {
    type: EDIT_TIMESHEET_SUCCESS,
    payload: data
  };
};

export const editTimesheetError = (error) => {
  return {
    type: EDIT_TIMESHEET_ERROR,
    payload: error
  };
};

export const resetTimesheet = () => {
  return {
    type: RESET_TIMESHEET
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
