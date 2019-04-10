import uuid from 'uuid/v4';

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

export const addFlight = data => ({
  type: FLIGHTS.ADD,
  data: {
    ...data,
    id: uuid(),
  },
});

export const deleteFlight = id => ({
  type: FLIGHTS.DELETE,
  id,
});

export const updateFlight = data => ({
  type: FLIGHTS.UPDATE,
  data,
});
