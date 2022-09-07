import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  ADD_ADMIN_ERROR,
  ADD_ADMIN_PENDING,
  ADD_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  GET_SINGLE_ADMIN_ERROR,
  GET_SINGLE_ADMIN_PENDING,
  GET_SINGLE_ADMIN_SUCCESS,
  RESET_ADMIN,
  RESET_MESSAGE
} from 'redux/admins/constants';

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsSuccess = (data) => ({
  type: GET_ADMINS_SUCCESS,
  payload: data
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const getSingleAdminPending = () => ({
  type: GET_SINGLE_ADMIN_PENDING
});

export const getSingleAdminSuccess = (data) => ({
  type: GET_SINGLE_ADMIN_SUCCESS,
  payload: data
});

export const getSingleAdminError = (error) => ({
  type: GET_SINGLE_ADMIN_ERROR,
  payload: error
});

export const addAdminPending = () => ({
  type: ADD_ADMIN_PENDING
});

export const addAdminSuccess = (data) => ({
  type: ADD_ADMIN_SUCCESS,
  payload: data
});

export const addAdminError = (error) => ({
  type: ADD_ADMIN_ERROR,
  payload: error
});

export const editAdminSuccess = (data) => ({
  type: EDIT_ADMIN_SUCCESS,
  payload: data
});

export const editAdminPending = () => ({
  type: EDIT_ADMIN_PENDING
});

export const editAdminError = (error) => ({
  type: EDIT_ADMIN_ERROR,
  payload: error
});

export const deleteAdminSuccess = (id) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: id
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
  payload: error
});
export const resetAdmin = () => ({
  type: RESET_ADMIN
});
export const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};
