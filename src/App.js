import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Routes from './routes';
import { closeSnackbar } from './redux/actions';
import { Snackbar } from './components/Snackbar';

const App = ({ open, text, closeSnackbar }) => {
  const handleClose = () => {
    closeSnackbar();
  };

  return (
    <Fragment>
      <Routes />
      <Snackbar open={open} text={text} onClose={handleClose} />
    </Fragment>
  );
};

const mapStateToProps = ({ snackbar }) => ({
  open: snackbar.open,
  text: snackbar.text,
});

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () => dispatch(closeSnackbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
