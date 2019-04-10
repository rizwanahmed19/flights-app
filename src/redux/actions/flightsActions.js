import { FLIGHTS } from '../constants';

export const loadFlights = () => ({
  type: FLIGHTS.LOAD,
});

export const setFlights = flights => ({
  type: FLIGHTS.LOAD_SUCCESS,
  flights,
});

export const setFlightsError = error => ({
  type: FLIGHTS.LOAD_FAIL,
  error,
});
