import React from 'react';
import CreateAccount from './createAccount';
import ManageRestaurant from './manageRestaurant';

class AdminPage extends React.Component {

  // if (this.state.change.page == "Create Account") {
  //   return(
  //     <CreateAccount />
  //   ) else {
  //     return(
  //     <ManageRestaurant />
  //     )
  //   }
  // }

  render() {
    return(
      <div>
        <button onClick={() => {this.props.history.push("/createAccount")}}>Manage Employees</button>
        <br/>
        <br/>
        <button onClick={() => {this.props.history.push("/manageRestaurant")}}>Manage Restaurant</button>
      </div>
    )
  }
}

export default AdminPage
