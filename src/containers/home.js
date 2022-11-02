import React from 'react';
import AdminPage from './adminPage';
import LoginPage from './loginPage';
import RestaurantPage from './restaurantPage';
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
    console.log("hi")
  //   let jwt = localStorage.getItem('jwt')
  //
  //       if (jwt) {
  //         fetch(`http://localhost:3000/api/login`, {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //             Authorization: `Bearer ${jwt}`
  //           },
  //           body: JSON.stringify(
  //             {
  //               account: {
  //               // name: 'Admin Account',
  //               // password: 'aaa'
  //               name: 'Account 2',
  //               password: 'bbb'
  //             }
  //           }
  //         )
  //       })
  //       .then(res => res.json())
  //       .then(json => {
  //         console.log(json)
  //         this.setState({account: json.account})
  //       })
  //   }
  }

  changeAccount = (input) => {
    this.setState({
      account: input
    })
  }

  swapDisplay = () => {
    if (this.state.display == 'adminPage') {
      this.setState({
        display: 'restaurant'
      })
    } else {
      this.setState({
        display: 'adminPage'
      })
    }
  }

  render() {
    if (this.state.display == 'adminPage' && Object.keys(this.state.account).length != 0) {
      return(
        <div>
          <button onClick={() => {this.swapDisplay()}}>SWAP DISPLAY</button>
          <AdminPage account={this.state.account}/>
        </div>
      )
    } else if (this.state.display == 'restaurant' && Object.keys(this.state.account).length != 0) {
      return(
        <div>
          <RestaurantPage account={this.state.account}/>
        </div>
      )
    } else {
      return(
        <div>
          <button onClick={() => {this.swapDisplay()}}>SWAP DISPLAY</button>
          <LoginPage changeAccount={this.changeAccount}/>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    account: state.accountChange.account
  }
}

const mapDispatchToProps = dispatch => {
  changeAccount: (event) => dispatch({type: "CHANGE_ACCOUNT", newAccount: event})
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
