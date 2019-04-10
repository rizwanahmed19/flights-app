import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { loadFlights, deleteFlight, openSnackbar } from '../../redux/actions';
import tableHeadData from './tableHeadData';
import { MainContainer } from '../../components/Container';
import { Table } from '../../components/Table';
import { CircularLoader } from '../../components/Loader';

const FlightsList = ({
  loadFlights,
  flights,
  isLoading,
  deleteFlight,
  openSnackbar,
}) => {
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (flights.length === 0) {
      loadFlights();
    }
  }, []);

  const handleOnChange = e => {
    setSearchText(e.target.value);
  };

  const handleDeleteClick = id => {
    deleteFlight(id);
    openSnackbar('Flight deleted');
  };

  const renderTable = () => {
    if (isLoading) {
      return <CircularLoader />;
    } else {
      return (
        <Table
          tableData={flights.filter(
            f =>
              f.departure.toLowerCase().indexOf(searchText.toLowerCase()) > -1,
          )}
          tableHeadData={tableHeadData}
          onDeleteClick={handleDeleteClick}
          onChange={handleOnChange}
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
  openSnackbar: text => dispatch(openSnackbar(text)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlightsList);
