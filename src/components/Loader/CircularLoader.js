import React from 'react';
import { Grid, CircularProgress, withStyles } from '@material-ui/core';

const styles = theme => ({
  loaderContainer: {
    width: '100%',
    height: '100%',
  },
});

const CircularLoader = ({ classes }) => (
  <Grid
    container
    justify="center"
    alignItems="center"
    classes={{ container: classes.loaderContainer }}
  >
    <CircularProgress />
  </Grid>
);

export default withStyles(styles)(CircularLoader);
