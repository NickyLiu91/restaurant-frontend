import React from 'react';
import CreateAccount from './createAccount';
import ManageRestaurant from './manageRestaurant';
import {connect} from 'react-redux'

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

  componentDidMount(){
    console.log(this.props)
  }

  render() {
    return(
      <div>
        <button onClick={() => {this.props.history.push(`/restaurant/${this.props.restaurant.id}/createAccount`)}}>Manage Employees</button>
        <br/>
        <br/>
        <button onClick={() => {this.props.history.push(`/restaurant/${this.props.restaurant.id}/manageRestaurant`)}}>Manage Restaurant</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    restaurant: state.restaurantChanger.restaurant
  }
}

export default connect(
  mapStateToProps,
  null
)(AdminPage)
