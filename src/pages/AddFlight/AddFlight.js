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
import { Formik, Form } from 'formik';

import { formatDate } from '../../utils';
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

const AddFlight = props => {
  const { classes } = props;
  const [state] = useState(formData);

  useEffect(() => {
    if (props.match.params.id) {
      console.log(props.match.params.id);
    }
  }, [props.match.params.id]);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log('FORM SUBMITTED', values);
    setSubmitting(false);
  };

  return (
    <MainContainer col={4}>
      <Paper className={classes.root}>
        <Typography
          classes={{ root: classes.heading }}
          variant="h4"
          align="center"
        >
          Add Flight
        </Typography>
        <Formik initialValues={state} onSubmit={handleSubmit}>
          {({ values, handleChange, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                id="departure"
                name="departure"
                label="Departure"
                onChange={handleChange}
                variant="outlined"
                classes={{ root: classes.textField }}
              />
              <TextField
                fullWidth
                id="arrival"
                name="arrival"
                label="Arrival"
                onChange={handleChange}
                variant="outlined"
                classes={{ root: classes.textField }}
              />
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
                    Add
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

export default withStyles(styles)(AddFlight);
