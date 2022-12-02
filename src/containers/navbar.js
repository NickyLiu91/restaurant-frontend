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
  }

  render(){
    // if (Object.keys(this.props.account).length != 0 && this.props.account.rank == 'admin') {
    //
    // }
    // if (!localStorage.getItem('jwt')) {
      return(
        <nav>
          <div>
            <p onClick={() => {this.props.history.push("/")}}>Home</p>
          </div>
          <div>
            {localStorage.getItem('jwt') && this.props.account.rank == 'admin' ? <p onClick={() => {this.props.history.push("/admin")}}>Admin</p> : null }
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
    account: state.accountChanger.account
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
