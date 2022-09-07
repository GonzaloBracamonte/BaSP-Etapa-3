import { TOGGLE_SIDEBAR, TOGGLE_MODAL, SET_HOME } from 'redux/global/constants';

export const toggleSidebar = (state) => {
  return {
    type: TOGGLE_SIDEBAR,
    payload: state
  };
};

export const toggleModal = () => {
  return {
    type: TOGGLE_MODAL
  };
};

export const setHome = (path) => {
  return {
    type: SET_HOME,
    payload: path
  };
};
