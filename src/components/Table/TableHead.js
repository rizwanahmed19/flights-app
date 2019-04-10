import React from 'react';
import {
  TableHead as MuiTableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const TableHead = ({ data, order, orderBy, onRequestSort }) => {
  const sortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <MuiTableHead>
      <TableRow>
        {data.map(row => (
          <TableCell
            key={row.id}
            sortDirection={orderBy === row.id ? order : false}
          >
            <Tooltip title="Sort" enterDelay={300}>
              <TableSortLabel
                active={orderBy === row.id}
                direction={order}
                onClick={sortHandler(row.id)}
              >
                {row.label}
              </TableSortLabel>
            </Tooltip>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

TableHead.propTypes = {
  data: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default TableHead;
