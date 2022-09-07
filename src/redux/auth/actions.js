import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SET_AUTHENTICATION,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  RESET_MESSAGE
} from './constants';

export const loginPending = () => {
  return {
    type: LOGIN_PENDING
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};

export const loginError = (error) => {
  return {
    type: LOGIN_ERROR,
    payload: error
  };
};

export const registerPending = () => {
  return {
    type: REGISTER_PENDING
  };
};

export const registerSuccess = (data) => {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  };
};

export const registerError = (error) => {
  return {
    type: REGISTER_ERROR,
    payload: error
  };
};

export const setAuthentication = (user) => {
  return {
    type: SET_AUTHENTICATION,
    payload: user
  };
};

export const getAuthenticationPending = () => {
  return {
    type: GET_AUTH_PENDING
  };
};

export const getAuthenticationSuccess = (data) => {
  return {
    type: GET_AUTH_SUCCESS,
    payload: data
  };
};

export const getAuthenticationError = (error) => {
  return {
    type: GET_AUTH_ERROR,
    payload: error
  };
};

export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
