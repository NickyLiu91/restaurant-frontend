import React from 'react';
import {connect} from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class ManageRestaurant extends React.Component {

  state = {
    name: '',
    price: '',
    image: ''
  }

  // componentDidMount(){
  //   fetch(`http://localhost:3000/api/restaurants/menu/${this.props.restaurant.id}`)
  //   .then(res => res.json())
  //   .then(json => {
  //     this.props.changeRestaurant(json)
  //     this.props.changeMenu(json.menuitems)
  //     this.props.changeOrders(json.orders)
  //     this.setState({
  //       restaurantId: this.props.restaurant.id
  //     })
  //   })
  // }


  handleStuff = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

 createMenuItem = () => {
   console.log(this.state)
     fetch(`http://localhost:3000/api/menuitems`, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
       },
       body: JSON.stringify(
       {
         restaurant_id: this.props.restaurant.id,
         name: this.state.name,
         price: this.state.price,
         image: `${this.state.image}.png`
       }
      )
    })
    .then(res => res.json())
    .then(json => {console.log(json)})
 }

 generateMenu = () => {
   let list = this.props.menu

   return list.map(
     item => {
       return (
         <div>
           <p>Name: {item.name}</p>
           <img src={require(`../images/restaurant${this.props.restaurant.id}/${item.image}`)} />
           <p>Price: {parseFloat(item.price)}</p>
         </div>
       )
     }
   )
 }

  render() {
    if (Object.keys(this.props.account).length != 0) {
        return(
          <div>
              <button onClick={() => {console.log(this.props)}}>test</button>
              <div>
              <h1>MENU</h1>
                {this.generateMenu()}
                <button onClick={() => {this.submitOrder()}}>Submit Order</button>
              </div>
              Name: <input id="name" type="text" value={this.state.name} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Price: <input id="price" type="integer" value={this.state.price} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              Image: <input id="image" type="text" value={this.state.image} onChange={event => this.handleStuff(event)}/>
              <br/>
              <br/>
              <button onClick={this.createMenuItem}>Add Item</button>
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
)(ManageRestaurant)
