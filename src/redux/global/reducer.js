import { TOGGLE_SIDEBAR, TOGGLE_MODAL, SET_HOME } from 'redux/global/constants';

const initialState = {
  showSidebar: false,
  showModal: false,
  message: '',
  loading: false,
  homePath: '/'
};

export const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        showModal: !state.showModal
      };
    case SET_HOME:
      return {
        ...state,
        homePath: action.payload
      };
    default:
      return state;
  }
};
