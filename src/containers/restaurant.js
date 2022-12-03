import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import OrderItem from './orderItem';

class RestaurantPage extends React.Component {

  state = {
    account: this.props.account,
    restaurant: {},
    menu: [],
    orders: [],
    guest: false,
    currentOrder: []
  }

  componentDidMount(){
    let restaurantId
    if (this.props.match.url.slice(-6) == "online"){
      let adjustedAddress = this.props.match.url.slice(0, -7)
      restaurantId = adjustedAddress.slice(12)
      this.props.changeLocation("online")
    } else {
      restaurantId = this.props.match.url.slice(12)
      this.props.changeLocation("offline")
    }

    fetch(`http://localhost:3000/api/restaurants/menu/${restaurantId}`)
    .then(res => res.json())
    .then(json => {
      this.props.changeRestaurant(json)
      this.props.changeMenu(json.menuitems)
      this.props.changeOrders(json.orders)
      console.log(this.props)
    })
  }

  generateMenu = () => {
    let list = this.props.menu

    return list.map(
      item => {
        return (
          <div>
            <p>Name: {item.name}</p>
            <p>Price: {parseFloat(item.price)}</p>
            {Object.keys(this.props.restaurant).length != 0 ? <button onClick={() => {this.addToOrder(item)}}> + </button> : null}
            {Object.keys(this.props.restaurant).length != 0 ? <button onClick={() => {this.removeOrderItem(item)}}> - </button> : null}
          </div>
        )
      }
    )
  }

  addToOrder = (item) => {
    let newOrderList = this.state.currentOrder
    newOrderList = [...newOrderList, {name: item.name, price: parseFloat(item.price)}]
    this.setState({
      currentOrder: newOrderList
    })
  }

  removeOrderItem = (item) => {

    let newOrderList = this.state.currentOrder
    let matchingItemIndex = newOrderList.findIndex(existingItem => existingItem.name == item.name)
    if (matchingItemIndex != -1) {
      newOrderList.splice(matchingItemIndex, 1)
      this.setState({
        currentOrder: newOrderList
      })
    } else {
      alert ("You do not have that item in your order!")
    }
  }

  generateOrderItems = (order) => {
    let list = order.orderItems

    return list.map(
      orderItem => {
        return (
          <OrderItem orderItem={orderItem} />
        )
      }
    )
  }

  generateOrders = () => {
    let list = this.props.orders

    return list.map(
      order => {
        return (
          <div className="order">
            {this.generateOrderItems(order)}
            <p>Total Price: {order.totalPrice}</p>
          </div>
        )
      }
    )
  }

  generateCurrentOrder = () => {
    let list = this.state.currentOrder
    let totalPrice = 0

    // let newArray = list.map(item => {return item.name})

    return list.map(
      orderItem => {
        return (
          <div>
            <div>
              <p id="text">name: {orderItem.name}</p>
              <p>Price: {orderItem.price}</p>
              <br/>
            </div>
            <br/>
            <br/>
          </div>
        )
      }
    )
  }

  submitOrder = () => {

    let currentOrderCopy = this.state.currentOrder
    let currentPrice = 0

    currentOrderCopy.forEach(item => {currentPrice += parseFloat(item.price)})

    fetch(`http://localhost:3000/api/orders`, {
       method: 'POST',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          // Authorization: `Bearer ${localStorage.getItem('jwt')}`
       },
       body: JSON.stringify(
       {
         order: {
            orderItems: currentOrderCopy,
            restaurant_id: this.props.restaurant.id,
            location: "online",
            totalPrice: currentPrice
         }
       }
      )
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        currentOrder: []
      }, () => {console.log(json)})
    })
  }

  render() {
    // console.log(this.state)
    if (Object.keys(this.props.restaurant).length != 0 && Object.keys(this.props.account).length != 0) {
      return(
        <div>
          <div>
            <h1>MENU</h1>
            {this.generateMenu()}
          </div>
            <br/>
            <br/>
          <div>
          <h1>List of ORDERS</h1>
            {this.generateOrders()}
          </div>
        </div>
      )
    } else if (Object.keys(this.props.restaurant).length != 0) {
      return(
        <div>
          <div>
            <h1>MENU</h1>
            {this.generateMenu()}
            <button onClick={() => {this.submitOrder()}}>Submit Order</button>
          </div>
          <div>
            <h1>Current Order</h1>
            {this.generateCurrentOrder()}
          </div>
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
)(RestaurantPage)
