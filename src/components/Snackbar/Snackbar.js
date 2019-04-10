import React from 'react';
import { Snackbar as MuiSnackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import PropTypes from 'prop-types';

import { IconButton } from '../Button';

const Snackbar = ({ open, text, onClose }) => (
  <MuiSnackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    open={open}
    autoHideDuration={3000}
    onClose={onClose}
    ContentProps={{
      'aria-describedby': 'message-id',
    }}
    message={<span id="message-id">{text}</span>}
    action={[
      <IconButton onClick={onClose} color="inherit">
        <CloseIcon />
      </IconButton>,
    ]}
  />
);

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Snackbar;
