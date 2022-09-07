import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_PENDING,
  GET_PROJECTS_ERROR,
  ADD_PROJECT_PENDING,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  GET_SINGLE_PROJECT_ERROR,
  GET_SINGLE_PROJECT_PENDING,
  GET_SINGLE_PROJECT_SUCCESS,
  RESET_PROJECT,
  RESET_MESSAGE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_ERROR
} from './constants';

export const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const getSingleProjectPending = () => {
  return {
    type: GET_SINGLE_PROJECT_PENDING
  };
};

export const getSingleProjectSuccess = (data) => {
  return {
    type: GET_SINGLE_PROJECT_SUCCESS,
    payload: data
  };
};

export const getSingleProjectError = (error) => {
  return {
    type: GET_SINGLE_PROJECT_ERROR,
    payload: error
  };
};

export const addProjectPending = () => {
  return {
    type: ADD_PROJECT_PENDING
  };
};

export const addProjectSuccess = (data) => {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: data
  };
};

export const addProjectError = (error) => {
  return {
    type: ADD_PROJECT_ERROR,
    payload: error
  };
};

export const editProjectPending = () => {
  return {
    type: EDIT_PROJECT_PENDING
  };
};

export const editProjectSuccess = (data) => {
  return {
    type: EDIT_PROJECT_SUCCESS,
    payload: data
  };
};

export const editProjectError = (error) => {
  return {
    type: EDIT_PROJECT_ERROR,
    payload: error
  };
};

export const resetProject = () => {
  return {
    type: RESET_PROJECT
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const deleteProjectPending = () => {
  return {
    type: DELETE_PROJECT_PENDING
  };
};

export const deleteProjectSuccess = (id) => {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: id
  };
};

export const deleteProjectError = (error) => {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: error
  };
};
