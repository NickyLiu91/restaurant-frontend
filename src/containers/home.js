import React from 'react';
import AdminPage from './adminPage';
import LoginPage from './loginPage';
import RestaurantPage from './restaurantPage';

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

    if (localStorage.getItem('jwt')) {
       this.fetchCurrentUser()
    }
  }

  fetchCurrentUser = () => {
    console.log("???")
    fetch('http://localhost:3000/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(r => r.json())
    .then(json => {
      console.log(json)
    })
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

export default Home
