import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_AUTH_PENDING,
  GET_AUTH_SUCCESS,
  GET_AUTH_ERROR,
  SET_AUTHENTICATION,
  RESET_MESSAGE
} from './constants';

const initialState = {
  isLoading: false,
  error: false,
  message: ''
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: 'Successful login'
      };
    case LOGIN_ERROR:
      return {
        ...state,
        error: true,
        message: 'The email or the password are incorrect',
        isLoading: false
      };
    case REGISTER_PENDING:
      return {
        ...state,
        message: 'Loading...'
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authenticated: action.payload.data,
        error: false,
        message: action.payload.message
      };
    case REGISTER_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
      };
    case GET_AUTH_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: initialState.error
      };
    }
    case GET_AUTH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload
      };
    }
    case GET_AUTH_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case SET_AUTHENTICATION: {
      return {
        ...state,
        authenticated: action.payload,
        isLoading: false
      };
    }
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};
