import React from 'react';

class CreateAccount extends React.Component {

  state = {
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
          restaurant_id: this.state.restaurant_id
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
    if (this.state.rank == 'manager') {
      // if (this.state.createType == 'account') {
        return(
          <div>
            <div>
              <h1>Create a manager account!</h1>
              Account name: <input id="managerName" type="text" value={this.state.managerName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              E-mail: <input id="email" type="text" value={this.state.email} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Password: <input id="managerPassword" type="password" value={this.state.password} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Phone: <input id="phone" type="text" value={this.state.phone} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              <button onClick={this.createManager}>Create Account</button>
            </div>
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
              Restaurant_id: <input id="restaurant_id" type="text" value={this.state.restaurant_id} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              <button onClick={this.createTable}>Create Table</button>
            </div>
            <br/>
            <br/>
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
          </div>
        )
    }

  }
}

export default CreateAccount
