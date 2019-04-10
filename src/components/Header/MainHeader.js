import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  mainHeader: {
    fontSize: '2rem',
    fontFamily: 'Anton',
    letterSpacing: '6px',
    textAlign: 'center',
    height: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#424242',
    boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 10,
  },
}));

const MainHeader = () => {
  const classes = useStyles();
  return <header className={classes.mainHeader}>Flights App</header>;
};

export default MainHeader;
