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
  RESET_MESSAGE,
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: '',
  timesheet: undefined
};

export const timesheetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        showModal: true,
        message: action.payload
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        list: action.payload.data
      };
    case GET_TIMESHEETS_BY_EMPLOYEE_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        showModal: true,
        message: 'Timesheet deleted',
        list: state.list.filter((timesheet) => timesheet._id !== action.payload)
      };
    case DELETE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        showModal: true,
        message: action.payload
      };
    case GET_SINGLE_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_SINGLE_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        timesheet: {
          employee: action.payload.data.employee._id,
          project: action.payload.data.project._id,
          task: action.payload.data.task._id,
          date: action.payload.data.date.substring(0, 10),
          role: action.payload.data.role,
          rate: action.payload.data.rate,
          workedHours: action.payload.data.workedHours,
          description: action.payload.data.description
        },
        message: action.payload.message
      };
    case GET_SINGLE_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: false,
        message: 'Loading...'
      };
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        isLoading: false,
        message: 'Loading...'
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload.message,
        timesheet: action.payload.data
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_TIMESHEET:
      return {
        ...state,
        timesheet: undefined
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
