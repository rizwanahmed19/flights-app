import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { MainHeader } from '../components/Header';
import FlightsList from '../pages/FlightsList';
import AddFlight from '../pages/AddFlight';

const Routes = () => (
  <Router>
    <MainHeader />
    <Switch>
      <Route path="/" exact component={FlightsList} />
      <Route path="/add/:id?" component={AddFlight} />
    </Switch>
  </Router>
);

export default Routes;
