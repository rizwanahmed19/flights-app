import React from 'react';
import {
  Toolbar,
  Typography,
  Button,
  TextField,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  textField: {
    width: '20rem',
  },
});

const TableToolbar = ({ title, btnText, classes, onChange }) => (
  <Toolbar classes={{ root: classes.toolbar }}>
    <Typography variant="h6" id="tableTitle">
      {title}
    </Typography>
    <TextField
      className={classes.textField}
      placeholder="Search by departure"
      onChange={onChange}
    />
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

TableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default withStyles(styles)(TableToolbar);
