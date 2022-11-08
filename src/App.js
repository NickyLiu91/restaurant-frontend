import React from 'react';
// import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { Route, Routes, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Home from './containers/home.js';
import restaurantPage from './containers/restaurantPage.js';

class App extends React.Component {
  render() {
    return(
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurantPage" component={restaurantPage} />
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
