import React from 'react';
import AdminPage from './adminPage';

class Home extends React.Component {

  state = {
    accountType: '',
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
        .then(json => { this.setState({accountType: json.account.rank})
        })
    }
  }

  render() {
    if (this.state.accountType == 'admin') {
      return(
        <div>
          <AdminPage />
        </div>
      )
    }
    return(
      <div>
      <button onClick={() => {console.log(this.state)}}>
      test
      </button>
        hi
      </div>
    )
  }
}

export default Home
