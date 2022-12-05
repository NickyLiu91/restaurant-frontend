import React from 'react';
import {connect} from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class CreateAccount extends React.Component {

  state = {
    account: this.props.account,
    employeeName: '',
    tableName: '',
    restaurantName: '',
    email: '',
    employeePassword: '',
    tablePassword: '',
    phone: '',
    rank: 'Rank',
    restaurant_id: 'ID',
    account_id: '',
    rank: '',
    location: '',
    createType: 'account',
    dropDown: false,
    employee: 'Employee',
    employees: [],
    employeeAction: 'Add'
  }


  handleStuff = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

 createEmployee = () => {
   if (this.props.account.rank == "Admin") {
     fetch(`http://localhost:3000/api/accounts`, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
       },
       body: JSON.stringify(
       {
         account: {
            name: this.state.employeeName,
            email: this.state.email,
            password: this.state.employeePassword,
            phone: this.state.phone,
            rank: this.state.rank,
            restaurant_id: this.state.restaurant_id
         }
       }
      )
    })
  } else {
    fetch(`http://localhost:3000/api/accounts`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
      },
      body: JSON.stringify(
      {
        account: {
           name: this.state.employeeName,
           email: this.state.email,
           password: this.state.employeePassword,
           phone: this.state.phone,
           rank: "Employee",
           restaurant_id: this.state.restaurant_id
        }
      }
     )
   })
  }
 }

 generateOwnerRestaurants = () => {
   let list = this.props.account.restaurants

   return list.map(
     restaurant => {
       return (
         <Dropdown.Item value={restaurant.id} onClick={(event) => {this.setState({restaurant_id: restaurant.id})}}>{restaurant.id}</Dropdown.Item>
       )
     }
   )
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

 employeeRankSelector = (event) => {
   this.setState({
     rank: event.target.id.slice(0, -6)
   })
 }

 componentDidUpdate(prevProps, prevState) {
  if (prevState.restaurant_id !== this.state.restaurant_id) {
     fetch(`http://localhost:3000/api/restaurants/${this.state.restaurant_id}`, {
       method: 'GET',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
           Authorization: `Bearer ${localStorage.getItem('jwt')}`
       }
      })
      .then(res => res.json())
      .then(json => {this.setState({
          employees: json.accounts
        })
      })
  }
}

 generateEmployees = () => {
   let employeeList = this.state.employees

   return employeeList.map(
     employee => {
       return (
         <Dropdown.Item value={employee.id}>{employee.name}</Dropdown.Item>
       )
     }
   )

 }

  render() {
    const ranks = ["Owner", "Employee"]

    if (Object.keys(this.props.account).length != 0) {
        return(
          <div>
              <button onClick={() => {console.log(this.props)}}>test</button>
            <div>
              <h1>Create an account!</h1>
              {this.props.account.rank == 'Admin' ?
                <div>
                Restaurant: <input id="restaurant_id" type="integer" value={this.state.restaurant_id} onChange={event => this.handleStuff(event)}/>
                <br/>
                <br/>
                </div> :
                <div id="restaurants">
                  <h2>Restaurant ID</h2>
                  <DropdownButton id="dropdown-basic-button" title={this.state.restaurant_id}>
                    {this.generateOwnerRestaurants()}
                  </DropdownButton>
                  <br/>
                  <br/>
                </div>
              }
              Account name: <input id="employeeName" type="text" value={this.state.employeeName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              E-mail: <input id="email" type="text" value={this.state.email} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Password: <input id="employeePassword" type="password" value={this.state.employeePassword} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Phone: <input id="phone" type="text" value={this.state.phone} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>

              <div>
                <h2>Edit Employees</h2>
                <div>
                  <h3>List of Employees</h3>
                  <DropdownButton id="dropdown-basic-button" title={this.state.employee}>
                  {this.generateEmployees()}
                  </DropdownButton>
                  <br/>
                  <br/>
                </div>
              </div>
              <br/>
              <br/>
              {this.props.account.rank == 'Admin' ?
              <div id="rankButton">
                <p>Rank</p>
                <DropdownButton id="dropdown-basic-button" title={this.state.rank}>
                  <Dropdown.Item href="#/action-1" id="OwnerButton" onClick={(event) => {this.employeeRankSelector(event)}}>Owner</Dropdown.Item>
                  <Dropdown.Item href="#/action-2" id="EmployeeButton" onClick={(event) => {this.employeeRankSelector(event)}}>Employee</Dropdown.Item>
                </DropdownButton>
                <br/>
                <br/>
              </div> : null}
              <button onClick={this.createEmployee}>Create Account</button>
            </div>
            <br/>
            <br/>
            {this.props.account.rank == 'Admin' ?
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
              <button onClick={this.createRestaurant}>Create Restaurant</button>
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

const mapStateToProps = state => {
  return {
    account: state.accountChanger.account,
    restaurant: state.restaurantChanger.restaurant,
    menu: state.menuChanger.menu,
    location: state.locationChanger.location,
    orders: state.ordersChanger.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: "CHANGE_ACCOUNT", newAccount: event}),
    changeRestaurant: (event) => dispatch({type: "CHANGE_RESTAURANT", newRestaurant: event}),
    changeMenu: (event) => dispatch({type: "CHANGE_MENU", newMenu: event}),
    changeLocation: (event) => dispatch({type: "CHANGE_LOCATION", newLocation: event}),
    changeOrders: (event) => dispatch({type: "CHANGE_ORDERS", newOrders: event})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateAccount)
