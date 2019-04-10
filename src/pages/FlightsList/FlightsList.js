import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { loadFlights, deleteFlight } from '../../redux/actions';
import tableHeadData from './tableHeadData';
import { MainContainer } from '../../components/Container';
import { Table } from '../../components/Table';
import { CircularLoader } from '../../components/Loader';

const FlightsList = ({ loadFlights, flights, isLoading, deleteFlight }) => {
  useEffect(() => {
    if (flights.length === 0) {
      loadFlights();
    }
  }, []);

  const handleDeleteClick = id => {
    deleteFlight(id);
  };

  const renderTable = () => {
    if (isLoading) {
      return <CircularLoader />;
    } else {
      return (
        <Table
          tableData={flights}
          tableHeadData={tableHeadData}
          onDeleteClick={handleDeleteClick}
        />
      );
    }
  };

  return <MainContainer col={8}>{renderTable()}</MainContainer>;
};

const mapStateToProps = ({ flights }) => ({
  flights: flights.data,
  isLoading: flights.loading,
  error: flights.error,
});

const mapDispatchToProps = dispatch => ({
  loadFlights: () => dispatch(loadFlights()),
  deleteFlight: id => dispatch(deleteFlight(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightsList);
