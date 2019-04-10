import { FLIGHTS } from '../constants';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FLIGHTS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case FLIGHTS.LOAD_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        data: [...action.flights],
      };
    case FLIGHTS.LOAD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
