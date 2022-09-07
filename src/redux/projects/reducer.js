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
  GET_SINGLE_PROJECT_PENDING,
  GET_SINGLE_PROJECT_SUCCESS,
  GET_SINGLE_PROJECT_ERROR,
  RESET_PROJECT,
  RESET_MESSAGE,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_ERROR
} from './constants';

const initialState = {
  list: [],
  isLoading: false,
  error: false,
  message: '',
  project: undefined
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        message: action.payload,
        showModal: true
      };
    case GET_SINGLE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case GET_SINGLE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        project: {
          projectName: action.payload.projectName,
          description: action.payload.description,
          startDate: action.payload.startDate.substring(0, 10),
          endDate: action.payload.endDate.substring(0, 10),
          admin: action.payload.admin?._id,
          client: action.payload.client,
          role: action.payload.employees[0].role,
          employeeId: action.payload.employees[0].employeeId?._id,
          rate: action.payload.employees[0].rate,
          hoursInProject: action.payload.employees[0].hoursInProject,
          isActive: action.payload.isActive
        }
      };
    case GET_SINGLE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        list: [...state.list.filter((project) => project._id !== action.payload)],
        message: 'Project deleted Successfully',
        showModal: true
      };
    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload,
        showModal: true
      };
    case ADD_PROJECT_PENDING:
      return {
        ...state,
        isLoading: true,
        message: 'Loading...'
      };
    case ADD_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload
      };
    case ADD_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case EDIT_PROJECT_PENDING:
      return {
        ...state,
        isLoading: false,
        message: 'Loading...'
      };
    case EDIT_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        message: action.payload
      };
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: true,
        message: action.payload
      };
    case RESET_PROJECT:
      return {
        ...state,
        project: undefined
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
