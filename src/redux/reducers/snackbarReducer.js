import { SNACKBAR } from '../constants';

const initialState = {
  open: false,
  text: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SNACKBAR.OPEN:
      return {
        open: true,
        text: action.text,
      };
    case SNACKBAR.CLOSE:
      return {
        open: false,
        text: '',
      };
    default:
      return state;
  }
};
