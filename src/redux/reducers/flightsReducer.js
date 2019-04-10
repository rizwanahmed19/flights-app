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
    case FLIGHTS.ADD:
      return {
        ...state,
        data: [action.data, ...state.data],
      };
    case FLIGHTS.UPDATE:
      return {
        ...state,
        data: state.data.map(x => {
          if (action.data.id == x.id) {
            return {
              ...x,
              ...action.data,
            };
          }
          return x;
        }),
      };
    case FLIGHTS.DELETE:
      return {
        ...state,
        data: state.data.filter(x => x.id !== action.id),
      };
    default:
      return state;
  }
};
