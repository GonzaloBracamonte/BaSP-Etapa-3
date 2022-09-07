import {
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_ERROR,
  GET_SINGLE_EMPLOYEES_SUCCESS,
  GET_SINGLE_EMPLOYEES_PENDING,
  GET_SINGLE_EMPLOYEES_ERROR,
  ADD_EMPLOYEES_SUCCESS,
  ADD_EMPLOYEES_PENDING,
  ADD_EMPLOYEES_ERROR,
  EDIT_EMPLOYEES_SUCCESS,
  EDIT_EMPLOYEES_PENDING,
  EDIT_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_ERROR,
  RESET_EMPLOYEE,
  RESET_MESSAGE
} from './constants';

export const getEmployeesSuccess = (data) => {
  return { type: GET_EMPLOYEES_SUCCESS, payload: data };
};

export const getEmployeesPending = () => {
  return { type: GET_EMPLOYEES_PENDING };
};

export const getEmployeesError = (error) => {
  return { type: GET_EMPLOYEES_ERROR, payload: error };
};

export const getSingleEmployeesSuccess = (data) => {
  return { type: GET_SINGLE_EMPLOYEES_SUCCESS, payload: data };
};

export const getSingleEmployeesPending = () => {
  return { type: GET_SINGLE_EMPLOYEES_PENDING };
};

export const getSingleEmployeesError = (error) => {
  return { type: GET_SINGLE_EMPLOYEES_ERROR, payload: error };
};

export const addEmployeesSuccess = (data) => {
  return { type: ADD_EMPLOYEES_SUCCESS, payload: data };
};

export const addEmployeesPending = () => {
  return { type: ADD_EMPLOYEES_PENDING };
};

export const addEmployeesError = (error) => {
  return { type: ADD_EMPLOYEES_ERROR, payload: error };
};

export const editEmployeesSuccess = (data) => {
  return { type: EDIT_EMPLOYEES_SUCCESS, payload: data };
};

export const editEmployeesPending = () => {
  return { type: EDIT_EMPLOYEES_PENDING };
};

export const editEmployeesError = (error) => {
  return { type: EDIT_EMPLOYEES_ERROR, payload: error };
};

export const deleteEmployeesSuccess = (id) => {
  return { type: DELETE_EMPLOYEES_SUCCESS, payload: id };
};

export const deleteEmployeesPending = () => {
  return { type: DELETE_EMPLOYEES_PENDING };
};

export const deleteEmployeesError = (error) => {
  return { type: DELETE_EMPLOYEES_ERROR, payload: error };
};

export const resetEmployee = () => {
  return { type: RESET_EMPLOYEE };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
