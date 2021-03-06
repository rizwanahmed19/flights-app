import React from 'react';
import { IconButton as MuiIconButton } from '@material-ui/core';
import PropTypes from 'prop-types';

const IconButton = ({ onClick, children, ...rest }) => (
  <MuiIconButton
    style={{ zIndex: 1000 }}
    onClick={onClick}
    aria-label="Delete"
    {...rest}
  >
    {children}
  </MuiIconButton>
);

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default IconButton;
