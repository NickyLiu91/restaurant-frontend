import React from 'react';
// import { Route, Switch, Redirect, withRouter} from 'react-router-dom'
import { Route, Routes, Switch, Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {compose} from 'redux';
import Home from './containers/home.js';
import RestaurantPage from './containers/restaurantPage.js';
import Navbar from './containers/navbar.js';
import LoginPage from './containers/loginPage.js';
import AdminPage from './containers/adminPage';
import CreateAccount from './containers/createAccount';
import ManageRestaurant from './containers/manageRestaurant';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/restaurants/:id/:online?" component={RestaurantPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/restaurants/:id/createAccount" component={CreateAccount} />
          <Route path="/restaurants/:id/manageRestaurant" component={ManageRestaurant} />
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
