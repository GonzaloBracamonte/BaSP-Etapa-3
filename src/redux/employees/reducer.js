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

const initialState = {
  isLoading: false,
  error: false,
  employee: undefined,
  list: [],
  message: ''
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    case GET_EMPLOYEES_PENDING:
      return { ...state, isLoading: true };
    case GET_EMPLOYEES_ERROR:
      return {
        ...state,
        error: true,
        message: action.payload
      };
    case GET_SINGLE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        employee: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          assignedProjects: action.payload.data.assignedProjects,
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };
    case GET_SINGLE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true, message: 'Loading...' };
    case GET_SINGLE_EMPLOYEES_ERROR:
      return { ...state, error: true, message: action.payload };
    case ADD_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employee: action.payload.data,
        error: false,
        message: action.payload.message
      };
    case ADD_EMPLOYEES_PENDING:
      return { ...state, message: 'Loading...' };
    case ADD_EMPLOYEES_ERROR:
      return { ...state, error: true, message: action.payload };
    case EDIT_EMPLOYEES_SUCCESS:
      return {
        ...state,
        error: false,
        isLoading: false,
        employee: {
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          email: action.payload.data.email,
          password: action.payload.data.password,
          assignedProjects: [action.payload.data.projectId],
          isActive: action.payload.data.isActive
        },
        message: action.payload.message
      };
    case EDIT_EMPLOYEES_PENDING:
      return {
        ...state,
        message: 'Loading...'
      };
    case EDIT_EMPLOYEES_ERROR:
      return { ...state, error: true, message: action.payload };
    case DELETE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: state.list.filter((employee) => employee._id !== action.payload),
        message: 'The employee was successfully deleted',
        error: false
      };
    case DELETE_EMPLOYEES_PENDING:
      return { ...state, isLoading: true, message: 'Loading...' };
    case DELETE_EMPLOYEES_ERROR:
      return { ...state, error: true, message: action.payload.message };
    case RESET_EMPLOYEE:
      return { ...state, employee: undefined };
    case RESET_MESSAGE:
      return {
        ...state,
        message: ''
      };
    default:
      return state;
  }
};
