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
import StripeCheckoutPage from './containers/stripeCheckoutPage';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {
  render() {
    return(
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurants/:id/" component={RestaurantPage} />
          <Route exact path="/restaurants/:id/online" component={RestaurantPage} />
          <Route path="/login" component={LoginPage} />
          <Route exact path="/restaurants/:id/admin" component={AdminPage} />
          <Route exact path="/restaurants/:id/createAccount" component={CreateAccount} />
          <Route exact path="/restaurants/:id/manageRestaurant" component={ManageRestaurant} />
          <Route exact path="/stripe" component={StripeCheckoutPage} />
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
