import { combineReducers } from 'redux';

import flightsReducer from './flightsReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  flights: flightsReducer,
  snackbar: snackbarReducer,
});
