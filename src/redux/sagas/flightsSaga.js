import { takeEvery, call, put, all } from 'redux-saga/effects';

import { FLIGHTS } from '../constants';
import { setFlights, setFlightsError } from '../actions';
import request from '../../services/axiosService';

const _formatFlightsData = data => {
  const [cheapFlights, businessFlights] = data;

  const formattedBusinessFlights = businessFlights.map(b => {
    const [departure, arrival] = b.flight.split(' -> ');

    return {
      id: b.uuid,
      arrival,
      departure,
      arrivalTime: b.arrival,
      departureTime: b.departure,
      class: 'business',
    };
  });

  return [...cheapFlights, ...formattedBusinessFlights];
};

export function* handleFlightsLoad() {
  try {
    const flights = yield all([
      call(request, { url: '/cheap', method: 'get' }),
      call(request, { url: '/business', method: 'get' }),
    ]);
    console.log('FLIGHTS', _formatFlightsData(flights));
    // yield put(setFlights(_formatFlightsData(flights)));
  } catch (err) {
    yield put(setFlightsError(err));
  }
}

export default function* watchFlightsLoad() {
  yield takeEvery(FLIGHTS.LOAD, handleFlightsLoad);
}
