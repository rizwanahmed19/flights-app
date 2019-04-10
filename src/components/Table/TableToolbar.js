import React from 'react';
import { Toolbar, Typography, withStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const TableToolbar = ({ title, btnText, classes }) => (
  <Toolbar classes={{ root: classes.toolbar }}>
    <Typography variant="h6" id="tableTitle">
      {title}
    </Typography>
    <Button
      variant="contained"
      color="primary"
      size="small"
      component={Link}
      to="/add"
    >
      {btnText}
    </Button>
  </Toolbar>
);

export default withStyles(styles)(TableToolbar);
