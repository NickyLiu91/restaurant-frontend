import React from 'react';
// import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { Route, Routes, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Home from './containers/home.js';
import Restaurant from './containers/restaurant.js';
import Navbar from './containers/navbar.js';
import LoginPage from './containers/loginPage.js';
import AdminPage from './containers/adminPage';

class App extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/restaurant/:id/:online?" component={Restaurant} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
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
