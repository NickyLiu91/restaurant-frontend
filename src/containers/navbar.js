import React from 'react';
import {connect} from 'react-redux'

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
            // <p onClick={() => {this.props.history.push("/login")}}>LogIn</p>
          </div>
        <nav/>
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    page: state.pageChanger.page
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changepage: (event) => dispatch({type: "CHANGE_PAGE", newPage: event})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
