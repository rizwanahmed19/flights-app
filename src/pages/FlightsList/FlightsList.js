import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadFlights } from '../../redux/actions';
import tableHeadData from './tableHeadData';
import { MainContainer } from '../../components/Container';
import { Table } from '../../components/Table';

const data = [
  {
    id: 4818458744742722560,
    departure: 'Ranelagh',
    arrival: 'Bernasconi',
    departureTime: 1554820717641,
    arrivalTime: 1554822131308,
  },
  {
    id: 1440685058351927296,
    departure: 'Ensenada',
    arrival: 'Puan',
    departureTime: 1554812885475,
    arrivalTime: 1554815649537,
  },
  {
    id: 4805785588881866752,
    departure: 'Almafuerte',
    arrival: 'Gonzalez Moreno',
    departureTime: 1554814646002,
    arrivalTime: 1554816780764,
  },
  {
    id: 8415644123580092416,
    departure: 'La Paz',
    arrival: 'Arroyito',
    departureTime: 1554820008582,
    arrivalTime: 1554827561021,
  },
  {
    id: 2783989528314906624,
    departure: 'General Pico',
    arrival: 'Batan',
    departureTime: 1554816321689,
    arrivalTime: 1554826244062,
  },
  {
    id: 278398952831638262,
    departure: 'General Pico',
    arrival: 'Batan',
    departureTime: 1554816321689,
    arrivalTime: 1554826244062,
  },
  {
    id: 27839895283149017656555,
    departure: 'General Pico',
    arrival: 'Batan',
    departureTime: 1554816321689,
    arrivalTime: 1554826244062,
  },
];

const FlightsList = ({ loadFlights }) => {
  useEffect(() => {
    loadFlights();
  }, []);

  return (
    <MainContainer col={8}>
      <Table tableData={data} tableHeadData={tableHeadData} />
    </MainContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  loadFlights: () => dispatch(loadFlights()),
});

export default connect(
  null,
  mapDispatchToProps,
)(FlightsList);
