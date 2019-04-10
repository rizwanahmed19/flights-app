import { takeEvery, call, put, all } from 'redux-saga/effects';
import _ from 'lodash';

import { FLIGHTS } from '../constants';
import { setFlights, setFlightsError } from '../actions';
import request from '../../services/axiosService';

const _formatFlightsData = data => {
  const [cheapFlights, businessFlights] = data;

  const formattedBusinessFlights = _.map(businessFlights, b => {
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

  return [
    ..._.map(cheapFlights, x => ({ ...x, class: 'cheap' })),
    ...formattedBusinessFlights,
  ];
};

export function* handleFlightsLoad() {
  try {
    const flights = yield all([
      call(request, { url: '/cheap', method: 'get' }),
      call(request, { url: '/business', method: 'get' }),
    ]);
    yield put(setFlights(_formatFlightsData(flights)));
  } catch (err) {
    yield put(setFlightsError(err));
  }
}

export default function* watchFlightsLoad() {
  yield takeEvery(FLIGHTS.LOAD, handleFlightsLoad);
}
