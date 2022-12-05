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
    edit: false,
    editEmployeeName: '',
    editEmployeeRank: '',
    editEmployeeEmail: '',
    editEmployeePassword: '',
    editEmployeePhone: '',
    editEmployeeId: ''
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
      .then(json => {
        console.log(json)
        this.setState({
          employees: json.accounts
        }, () => {console.log("???????????")})
      })
  }
}

deleteEmployee = (employee) => {
  fetch(`http://localhost:3000/api/accounts/${employee.id}`, {
    method: 'DELETE',
    headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })
  .then(res => {
    let newAccounts = this.state.employees
    console.log(newAccounts)
    let matchingItemIndex = this.state.employees.findIndex(account => account.id == employee.id)
    newAccounts.splice(matchingItemIndex, 1)
    this.setState({
      employees: newAccounts
    })
  })
}

editEmployee = (employee) => {
  this.setState({
    edit: true,
    editEmployeeName: employee.name,
    editEmployeeRank: employee.rank,
    editEmployeeEmail: employee.email,
    editEmployeePassword: employee.password,
    editEmployeePhone: employee.phone,
    editEmployeeId: employee.id
  })
}

submitEmployeeEdit = (employee) => {
  fetch(`http://localhost:3000/api/accounts/${employee.id}`, {
    method: 'PUT',
    headers: {
       'Content-Type': 'application/json',
       'Accept': 'application/json',
       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(
    {
      account: {
         name: this.state.editEmployeeName,
         email: this.state.editEmployeeEmail,
         password: this.state.editEmployeePassword,
         phone: this.state.editEmployeePhone,
         rank: this.state.editEmployeeRank,
         restaurant_id: this.state.restaurant_id
      }
    }
   )
 })
  .then(res => res.json())
  .then(json => {
    let newEmployees = this.state.employees

    let matchingEmployeeIndex = this.state.employees.findIndex(employeeObj => employeeObj.id == employee.id)
    console.log(matchingEmployeeIndex)
    newEmployees[matchingEmployeeIndex] = json


    this.setState({
      employees: newEmployees
    }, () => {this.cancelEdit()})
  })
}

cancelEdit = () => {
  this.setState({
    edit: false,
    editEmployeeName: '',
    editEmployeeEmail: '',
    editEmployeePassword: '',
    editEmployeePhone: '',
    editEmployeeId: ''
  })
}

generateEmployees = () => {
  let list = this.state.employees

  return list.map(
    employee => {
      return(
        <div>
          {!this.state.edit || this.state.editEmployeeId != employee.id ?
            <div className="employee">
              <p>Name: {employee.name}</p>
              <p>RanK: {employee.rank}</p>
              <p>Email: {employee.email}</p>
              <p>Password: {employee.password}</p>
              <p>Phone: {employee.phone}</p>
              <button onClick={() => {this.deleteEmployee(employee)}}> Fire </button>
              <button onClick={() => {this.editEmployee(employee)}}> Edit </button>
            </div> :
            <div>
              Name: <input id="editEmployeeName" type="text" value={this.state.editEmployeeName} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Rank: <input id="editEmployeeRank" type="text" value={this.state.editEmployeeRank} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Email: <input id="editEmployeeEmail" type="text" value={this.state.editEmployeeEmail} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Password: <input id="editEmployeePassword" type="text" value={this.state.editEmployeePassword} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Phone: <input id="editEmployeePhone" type="integer" value={this.state.editEmployeePhone} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              {!this.state.edit ? <button onClick={() => {this.editEmployee(employee)}}> Edit </button> :
              <button onClick={() => {this.submitEmployeeEdit(employee)}}> Submit Edit </button>
              }
              <button onClick={this.cancelEdit}> Cancel </button>
            </div>
          }
        </div>
      )
      // return (
      //   <div>
      //     {!this.state.edit || this.state.editItemId != item.id ?
      //       <div>
      //         <p>Name: {item.name}</p>
      //         <img src={require(`../images/restaurant${this.props.restaurant.id}/${item.image}`)} />
      //         <p>Price: {parseFloat(item.price)}</p>
      //         <button onClick={() => {this.deleteItem(item)}}> - </button>
      //         <button onClick={() => {this.editItem(item)}}> Edit </button>
      //       </div> :
      //       <div>
      //         Name: <input id="editItemName" type="text" value={this.state.editItemName} onChange={event => this.handleStuff(event)}/>
      //         <br/>
      //         <br/>
      //         Price: <input id="editItemPrice" type="integer" value={this.state.editItemPrice} onChange={event => this.handleStuff(event)}/>
      //         <br/>
      //         <br/>
      //         Image: <input id="editItemImage" type="text" value={this.state.editItemImage} onChange={event => this.handleStuff(event)}/>
      //         <br/>
      //         <br/>
      //         {!this.state.edit ? <button onClick={() => {this.editItem(item)}}> Edit </button> :
      //         <button onClick={() => {this.submitItemEdit(item)}}> Submit Edit </button>
      //         }
      //         <button onClick={this.cancelEdit}> Cancel </button>
      //       </div>
      //     }
      //   </div>
      // )
    }
  )
}

  render() {

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
                <h2>Employees List</h2>
                  {this.generateEmployees()}
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
