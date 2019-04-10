import React, { useState } from 'react';
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';

import { formatDate } from '../../utils';
import TableHead from './TableHead';
import TableToolbar from './TableToolbar';
import { IconButton } from '../Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  tableRow: {
    cursor: 'pointer',
  },
}));

const ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

const Table = ({ tableData, tableHeadData, onDeleteClick, history }) => {
  const classes = useStyles();
  const [order, setOrder] = useState(ORDER.ASC);
  const [orderBy, setOrderBy] = useState('departure');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === ORDER.DESC;
    setOrder(isDesc ? ORDER.ASC : ORDER.DESC);
    setOrderBy(property);
  };

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = e => {
    setRowsPerPage(e.target.value);
  };

  const desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  };

  const stableSort = (data, cmp) => {
    const stabilized = data.map((d, idx) => [d, idx]);
    stabilized.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilized.map(s => s[0]);
  };

  const getComparator = (order, orderBy) => {
    return order === ORDER.DESC
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  };

  const handleDeleteClick = id => e => {
    e.stopPropagation();
    onDeleteClick(id);
  };

  const renderCells = data => {
    return tableHeadData.map(t => (
      <TableCell key={t.id} component="td" scope="row">
        {t.delete ? (
          <IconButton onClick={handleDeleteClick(data.id)}>
            <DeleteIcon />
          </IconButton>
        ) : t.date ? (
          formatDate(data[t.id])
        ) : (
          data[t.id]
        )}
      </TableCell>
    ));
  };

  return (
    <Paper className={classes.root}>
      <TableToolbar title="Flights" btnText="Add Flight" />
      <div className={classes.tableWrapper}>
        <MuiTable className={classes.table}>
          <TableHead
            data={tableHeadData}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(tableData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(d => (
                <TableRow
                  onClick={() => history.push(`/add/${d.id}`)}
                  hover
                  tabIndex={-1}
                  key={d.id}
                  classes={{ root: classes.tableRow }}
                >
                  {renderCells(d)}
                </TableRow>
              ))}
          </TableBody>
        </MuiTable>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page',
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableHeadData: PropTypes.array.isRequired,
};

export default withRouter(Table);
