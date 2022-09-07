import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
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
} from './constants';

const initialState = {
  adminList: [],
  isLoading: false,
  admin: undefined,
  error: false,
  message: ''
};

export const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        adminList: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload.message
      };
    case GET_SINGLE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SINGLE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        admin: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };
    case GET_SINGLE_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case ADD_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case ADD_ADMIN_SUCCESS:
      return {
        ...state,
        admin: action.payload.data,
        isLoading: false,
        error: false,
        message: action.payload.message
      };
    case ADD_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case EDIT_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case EDIT_ADMIN_SUCCESS:
      return {
        ...state,
        error: false,
        admin: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          isActive: action.payload.data.isActive
        },
        isLoading: false,
        message: action.payload.message
      };
    case EDIT_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        adminList: state.adminList.filter((admin) => admin._id !== action.payload),
        message: 'The admin was successfully deleted'
      };
    case DELETE_ADMIN_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload,
        isLoading: false
      };
    case RESET_ADMIN:
      return {
        ...state,
        admin: undefined
      };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};

export default superAdminReducer;
