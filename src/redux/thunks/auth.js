import {
  loginPending,
  loginSuccess,
  loginError,
  registerPending,
  registerSuccess,
  registerError
} from '../auth/actions';
import firebase from 'helper/firebase';

const url = `${process.env.REACT_APP_API_URL}`;

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await response.user.getIdToken();
      const {
        claims: { role }
      } = await response.user.getIdTokenResult();
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('role', role);
      return dispatch(loginSuccess());
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const registerEmployee = (obj) => {
  return async (dispatch) => {
    try {
      const requestConfig = {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
      };
      dispatch(registerPending());
      const response = await fetch(`${url}/auth/register`, requestConfig);
      const data = await response.json();
      if (!data.error) {
        dispatch(registerSuccess(data));
      } else dispatch(registerError(data.message));
    } catch (error) {
      dispatch(registerError(error.toString()));
    }
  };
};
