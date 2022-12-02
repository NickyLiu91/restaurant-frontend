import React from 'react';
import AdminPage from './adminPage';
import LoginPage from './loginPage';
import Restaurant from './restaurant';
import {connect} from 'react-redux'

class Home extends React.Component {

  state = {
    account: {},
    restaurant: {},
    items: {},
    display: 'adminPage'
  }

  // componentDidMount() {
  //   let jwt = localStorage.getItem('jwt')
  //   if (jwt) {
  //     fetch(`http://localhost:3000/api/login`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json',
  //         Authorization: `Bearer ${jwt}`
  //       },
  //       body: JSON.stringify(
  //         {
  //           account: {
  //           name: "Account 2",
  //           password: "testpassword"
  //         }
  //       }
  //     )
  //   })
  //   .then(res => res.json())
  //   .then(json => {
  //     fetch('http://localhost:3000/api/orders', {
  //        method: 'GET',
  //        headers: {
  //           Authorization: `Bearer ${localStorage.getItem('jwt')}`
  //        }
  //     })
  //     .then(res => res.json())
  //     .then(json2 => {
  //       this.setState({
  //         restaurant: json.account.restaurants[0],
  //         items: json
  //       })
  //     })
  //   })
  //   }
  // }

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

  changeAccount = (input) => {
    this.setState({
      account: input
    })
  }

  logOut = () => {
    this.props.changeAccount({})
    localStorage.clear()
  }

  render() {
    if (Object.keys(this.props.account).length != 0 && this.props.account.rank == 'admin') {
      return(
        <div>
          <button onClick={() => {this.logOut()}}>Log Out</button>
          <AdminPage account={this.props.account}/>
        </div>
      )
    } else {
      return(
        <div>
          <LoginPage />
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
