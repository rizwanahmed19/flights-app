import { SNACKBAR } from '../constants';

export const openSnackbar = text => ({
  type: SNACKBAR.OPEN,
  text,
});

export const closeSnackbar = () => ({
  type: SNACKBAR.CLOSE,
});
