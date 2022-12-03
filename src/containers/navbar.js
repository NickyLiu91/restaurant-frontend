import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'
import AdminPage from './adminPage';

class NavBar extends React.Component {

  componentDidMount() {
    let jwt = localStorage.getItem('jwt')

    if (jwt) {
      fetch(`http://localhost:3000/api/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${jwt}`
        }
      })
      .then(res => res.json())
      .then(json => {
        this.setState({
          account: json.account
        }, () => {this.props.changeAccount(json.account)})
      })
    }
  }

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.changeAccount({})
    this.props.history.push(`/restaurant/${this.props.restaurant.id}`)
  }

  render(){
    console.log(this.props.account)
    console.log(this.props.restaurant)
    // if (this.props.restaurant.account.id == this.props.account.id) {
    //   console.log("this is the owner!")
    // }
      return(
        <nav>
          <div>
            {localStorage.getItem('jwt') ? <p>{this.props.account.name}</p> : null }
          </div>
          <div>
            {localStorage.getItem('jwt') && (this.props.account.rank == 'admin'
          || (Object.keys(this.props.account).length != 0 && Object.keys(this.props.restaurant).length != 0)
           && (this.props.account.id == this.props.restaurant.account.id))
           ? <p onClick={() => {this.props.history.push("/admin")}}>Admin</p> : null }
          </div>
          <div>
            {!localStorage.getItem('jwt') ? <p onClick={() => {this.props.history.push("/login")}}>LogIn</p> : <p onClick={() => {this.logOut()}}>LogOut</p>}
          </div>
        </nav>
      )
    // }

  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    restaurant: state.restaurantChanger.restaurant
  }
}


const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: "CHANGE_ACCOUNT", newAccount: event})
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps)
)(NavBar)
