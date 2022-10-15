import React from 'react';

class CreateAccount extends React.Component {

  state = {
    account: this.props.account,
    managerName: '',
    tableName: '',
    restaurantName: '',
    email: '',
    managerPassword: '',
    tablePassword: '',
    phone: '',
    rank: '',
    restaurant_id: '',
    account_id: '',
    rank: 'manager',
    location: '',
    createType: 'account'
  }

  handleStuff = (event) => {
   this.setState({
     [event.target.id]: event.target.value
   })
 }

 createManager = () => {
   fetch(`http://localhost:3000/api/accounts`, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify(
     {
       account: {
          name: this.state.managerName,
          email: this.state.email,
          password: this.state.managerPassword,
          phone: this.state.phone,
          rank: "manager"
       }
     }
    )
  })
 }

 createTable = () => {
   fetch(`http://localhost:3000/api/accounts`, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
     },
     body: JSON.stringify(
     {
       account: {
          name: this.state.tableName,
          rank: 'table',
          password: this.state.tablePassword,
          restaurant_id: this.state.account.rank == 'admin' ? this.state.restaurant_id : this.state.account.restaurants[0].id
       }
     }
    )
  })
 }

 createRestaurant = () => {
   fetch(`http://localhost:3000/api/restaurants`, {
     method: 'POST',
     headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
         Authorization: `Bearer ${localStorage.getItem('jwt')}`
     },
     body: JSON.stringify(
     {
          name: this.state.restaurantName,
          location: this.state.location,
          account_id: this.state.account_id
     }
    )
  })
 }

 // swapCreateType = () => {
 //   if (this.state.createType == 'account') {
 //     this.setState({createType: 'table'})
 //   } else {
 //     this.setState({createType: 'account'})
 //   }
 // }


  render() {
    if (Object.keys(this.state.account).length != 0) {
    // if (this.state.rank == 'admin') {
      // if (this.state.createType == 'account') {
        return(
          <div>
              <button onClick={() => {console.log(this.state.account.restaurants[0])}}>test</button>
            {this.state.account.rank == 'admin' ?
            <div>
              <h1>Create a manager account!</h1>
              Account name: <input id="managerName" type="text" value={this.state.managerName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              E-mail: <input id="email" type="text" value={this.state.email} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Password: <input id="managerPassword" type="password" value={this.state.managerPassword} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Phone: <input id="phone" type="text" value={this.state.phone} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              <button onClick={this.createManager}>Create Account</button>
            </div> : null }
            <br/>
            <br/>
            <div>
              <h1>Create a table account!</h1>
              Table name: <input id="tableName" type="text" value={this.state.tableName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Password: <input id="tablePassword" type="password" value={this.state.tablePassword} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              {this.state.account.rank == 'admin' ?
              <p>
              Restaurant_id: <input id="restaurant_id" type="text" value={this.state.restaurant_id} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              </p> : null }
              <button onClick={this.createTable}>Create Table</button>
            </div>
            <br/>
            <br/>
            {this.state.account.rank == 'admin' ?
            <div>
              <h1>Create a restaurant!!</h1>
              Restaurant name: <input id="restaurantName" type="text" value={this.state.restaurantName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Location: <input id="location" type="text" value={this.state.location} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Owner_id: <input id="account_id" type="text" value={this.state.account_id} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              <button onClick={this.createRestaurant}>Create Table</button>
            </div>
            : null }
          </div>
        )
    } else {
      return(
        <div>
        temp
        </div>
      )
    }

  }
}

export default CreateAccount
