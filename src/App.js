import React from 'react';
// import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { Route, Routes, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Home from './containers/home.js';
import restaurant from './containers/restaurant.js';

class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurant" component={restaurant} />
        </Switch>
      </div>
    )
  }
}

export default compose(
  withRouter,
  connect(
    null,
    null)
)(App);
