import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Typography,
  withStyles,
  Grid,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { Formik, Form, ErrorMessage } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import { formatDate } from '../../utils';
import { addFlight, updateFlight, openSnackbar } from '../../redux/actions';
import { MainContainer } from '../../components/Container';

const styles = theme => ({
  root: {
    width: '100%',
    padding: 25,
  },
  heading: {
    marginBottom: 30,
  },
  textField: {
    marginBottom: 40,
  },
  error: {
    fontFamily: 'Roboto',
    color: '#f00',
    marginTop: 3,
    fontSize: 15,
  },
});

const FLIGHT = {
  CHEAP: 'cheap',
  BUSINESS: 'business',
};

const formData = {
  departure: '',
  arrival: '',
  departureTime: formatDate(Date.now()),
  arrivalTime: formatDate(Date.now()),
  flightType: FLIGHT.CHEAP,
};

const validationSchema = Yup.object().shape({
  departure: Yup.string().required('Required'),
  arrival: Yup.string().required('Required'),
});

const AddFlight = props => {
  const {
    classes,
    flights,
    addFlight,
    updateFlight,
    openSnackbar,
    match,
    history,
  } = props;
  const {
    params: { id },
  } = match;
  const [state, setState] = useState(formData);

  useEffect(() => {
    if (id) {
      if (flights.length === 0) {
        return history.goBack();
      }
      const flight = flights.find(x => x.id == id);
      setState({
        departure: flight.departure,
        arrival: flight.arrival,
        departureTime: formatDate(flight.departureTime),
        arrivalTime: formatDate(flight.arrivalTime),
        flightType: flight.class,
      });
    }
  }, [id, flights.length]);

  const handleSubmit = (values, { setSubmitting }) => {
    const data = {
      departure: values.departure,
      arrival: values.arrival,
      departureTime: values.departureTime,
      arrivalTime: values.arrivalTime,
      class: values.flightType,
    };

    if (!id) {
      addFlight(data);
      openSnackbar('Flight added');
    } else {
      updateFlight({ ...data, id });
      openSnackbar('Flight updated');
    }

    setSubmitting(false);
    history.goBack();
  };

  return (
    <MainContainer col={4}>
      <Paper className={classes.root}>
        <Typography
          classes={{ root: classes.heading }}
          variant="h4"
          align="center"
        >
          {id ? 'Update Flight' : 'Add Flight'}
        </Typography>
        <Formik
          enableReinitialize
          initialValues={state}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <div className={classes.textField}>
                <TextField
                  fullWidth
                  id="departure"
                  name="departure"
                  label="Departure"
                  onChange={handleChange}
                  variant="outlined"
                  value={values.departure}
                />
                <ErrorMessage name="departure">
                  {msg => <div className={classes.error}>{msg}</div>}
                </ErrorMessage>
              </div>
              <div className={classes.textField}>
                <TextField
                  fullWidth
                  id="arrival"
                  name="arrival"
                  label="Arrival"
                  onChange={handleChange}
                  variant="outlined"
                  value={values.arrival}
                />
                <ErrorMessage name="arrival">
                  {msg => <div className={classes.error}>{msg}</div>}
                </ErrorMessage>
              </div>
              <Grid
                container
                justify="space-between"
                classes={{ container: classes.textField }}
              >
                <Grid item sm={5}>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    name="departureTime"
                    id="departureTime"
                    label="Departure Time"
                    onChange={handleChange}
                    value={values.departureTime}
                  />
                </Grid>
                <Grid item sm={5}>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    name="arrivalTime"
                    id="arrivalTime"
                    label="Arrival Time"
                    onChange={handleChange}
                    value={values.arrivalTime}
                  />
                </Grid>
              </Grid>

              <Grid item sm={4}>
                <RadioGroup
                  aria-label="flightType"
                  name="flightType"
                  value={values.flightType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value={FLIGHT.CHEAP}
                    control={<Radio color="primary" />}
                    label="Cheap"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value={FLIGHT.BUSINESS}
                    control={<Radio color="primary" />}
                    label="Business"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>

              <Grid container justify="center">
                <Grid item sm={3}>
                  <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {id ? 'Update' : 'Add'}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </MainContainer>
  );
};

const mapStateToProps = ({ flights }) => ({
  flights: flights.data,
});

const mapDispatchToProps = dispatch => ({
  addFlight: data => dispatch(addFlight(data)),
  updateFlight: data => dispatch(updateFlight(data)),
  openSnackbar: text => dispatch(openSnackbar(text)),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddFlight),
);
