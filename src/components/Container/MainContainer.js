import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const MainContainer = ({ children, col }) => (
  <Grid
    container
    alignItems="flex-start"
    justify="center"
    style={{ minHeight: 'calc(100vh - 14rem)', margin: '5rem 0' }}
  >
    <Grid item xs={col}>
      {children}
    </Grid>
  </Grid>
);

MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  col: PropTypes.number,
};

MainContainer.defaultProps = {
  col: 4,
};

export default MainContainer;
