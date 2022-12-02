import React from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux';
import { Route, Link, withRouter } from 'react-router-dom'

class NavBar extends React.Component {

  logOut = () => {
    localStorage.removeItem('jwt');
    this.props.changeAccount({})
    // this.props.history.push("/login")
  }

  render(){
    if (!localStorage.getItem('jwt')) {
      return(
        <nav>
          <div >
            <p onClick={() => {this.props.history.push("/")}}>Home</p>
          </div>
          <div >
            <p onClick={() => {this.props.history.push("/login")}}>LogIn</p>
          </div>
        </nav>
      )
    }

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
