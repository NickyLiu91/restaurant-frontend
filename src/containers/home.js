import React from 'react';
import AdminPage from './adminPage';
import LoginPage from './loginPage';

class Home extends React.Component {

  state = {
    account: {},
    restaurant: {},
    items: {}
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
    console.log(this.state)
    let jwt = localStorage.getItem('jwt')

        if (jwt) {
          fetch(`http://localhost:3000/api/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(
              {
                account: {
                // name: 'Admin Account',
                // password: 'aaa'
                name: 'Account 2',
                password: 'bbb'
              }
            }
          )
        })
        .then(res => res.json())
        .then(json => {
          console.log(json)
          this.setState({account: json.account})
        })
    }
  }

  render() {
    if (Object.keys(this.state.account).length != 0) {
      return(
        <div>
          <AdminPage account={this.state.account}/>
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

export default Home
