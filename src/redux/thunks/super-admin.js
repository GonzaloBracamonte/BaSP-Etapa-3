import {
  getAdminsSuccess,
  getAdminsError,
  getAdminsPending,
  addAdminError,
  addAdminPending,
  addAdminSuccess,
  editAdminError,
  editAdminPending,
  editAdminSuccess,
  deleteAdminError,
  deleteAdminPending,
  deleteAdminSuccess,
  getSingleAdminError,
  getSingleAdminPending,
  getSingleAdminSuccess
} from 'redux/superadmin/actions';

const url = `${process.env.REACT_APP_API_URL}/super-admin`;

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/admins`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getAdminsSuccess(data.data))
        : dispatch(getAdminsError(data.message));
    } catch (error) {
      return dispatch(getAdminsError(error));
    }
  };
};

export const getSingleAdmin = (id) => {
  return async (dispatch) => {
    dispatch(getSingleAdminPending());
    try {
      const token = sessionStorage.getItem('token');

      const response = await fetch(`${url}/admins/${id}`, { headers: { token } });
      const data = await response.json();

      return !data.error
        ? dispatch(getSingleAdminSuccess(data))
        : dispatch(getSingleAdminError(data.message));
    } catch (error) {
      return dispatch(getSingleAdminError(error));
    }
  };
};

export const addAdmin = (obj) => {
  return async (dispatch) => {
    dispatch(addAdminPending());
    try {
      const token = sessionStorage.getItem('token');
      const dataOptions = {
        method: 'POST',
        headers: { 'content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/admins`, dataOptions);
      const data = await response.json();

      return !data.error ? dispatch(addAdminSuccess(data)) : dispatch(addAdminError(data.message));
    } catch (error) {
      dispatch(addAdminError(error));
    }
  };
};

export const editAdmin = (obj, id) => {
  return async (dispatch) => {
    dispatch(editAdminPending());
    try {
      const token = sessionStorage.getItem('token');
      const dataOptions = {
        method: 'PUT',
        headers: { 'Content-type': 'application/json', token },
        body: JSON.stringify(obj)
      };

      const response = await fetch(`${url}/admins/${id}`, dataOptions);
      const data = await response.json();

      return !data.error
        ? dispatch(editAdminSuccess(data))
        : dispatch(editAdminError(data.message));
    } catch (error) {
      return dispatch(editAdminError(error));
    }
  };
};

export const deleteAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminPending());
    try {
      const token = sessionStorage.getItem('token');
      const dataOptions = {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json', token }
      };

      const response = await fetch(`${url}/admins/${id}`, dataOptions);
      const data = await response.json();

      return !data.error
        ? dispatch(deleteAdminSuccess(id))
        : dispatch(deleteAdminError(data.message));
    } catch (error) {
      return dispatch(deleteAdminError(error));
    }
  };
};
