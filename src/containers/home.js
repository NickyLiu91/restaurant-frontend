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
                name: "Admin Account",
                password: "aaa"
              }
            }
          )
        })
        .then(res => res.json())
        .then(json => {
          this.setState({accountType: json.account})
        })
    }
  }

  render() {
    if (this.state.account.rank == 'admin') {
      return(
        <div>
          <AdminPage />
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
