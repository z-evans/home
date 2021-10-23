import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MainPage from './App';
import './index.css';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
      </Switch>
    </Router>
  );
}

export default Routes;