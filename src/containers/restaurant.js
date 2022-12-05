import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import OrderItem from './orderItem';
import {v4 as uuidv4} from 'uuid'

class RestaurantPage extends React.Component {

  state = {
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
          </div>
        )
      }
    )
  }

  addToOrder = (item) => {
    let newOrderList = this.state.currentOrder
    newOrderList = [...newOrderList, {name: item.name, price: parseFloat(item.price), id: uuidv4(), status: "Not Started"}]
    this.setState({
      currentOrder: newOrderList
    })
  }

  removeOrderItem = (item) => {
    if (item.status == "Not Started") {
      let newOrderList = this.state.currentOrder
      let matchingItemIndex = newOrderList.findIndex(existingItem => existingItem.id == item.id)

      newOrderList.splice(matchingItemIndex, 1)
      this.setState({
        currentOrder: newOrderList
      })
    } else {
      alert("That item is currently being prepared and cannot be cancelled.")
    }
  }

  generateOrderItems = (order) => {
    let list = order.orderItems

    return list.map(
      orderItem => {
        return (
          <OrderItem key={orderItem.id} order={order} orderItem={orderItem} removeOrderItem={this.removeOrderItem} changeOrderItemStatus={this.changeOrderItemStatus}/>
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
            <p>ID: {order.id}</p>
            {this.generateOrderItems(order)}
            <p>Total Price: {order.totalPrice}</p>
            <p>Status: {order.status}</p>
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
            <OrderItem key={orderItem.id} orderItem={orderItem} removeOrderItem={this.removeOrderItem}/>
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
        currentOrder: json.orderItems
      })
    })
  }

  changeOrderItemStatus = (order, orderItem, event) => {
    console.log(order)
    console.log(orderItem)
    console.log(order.orderItems)

    let currentOrderItems = order.orderItems
    let matchingItemIndex = currentOrderItems.findIndex(existingItem => existingItem.id == orderItem.id)
    console.log(currentOrderItems[matchingItemIndex].status)
    currentOrderItems[matchingItemIndex].status = event.target.text
    console.log(currentOrderItems[matchingItemIndex].status)
    console.log(currentOrderItems)
    // fetch(`http://localhost:3000/api/orders/${order.id}`, {
    //    method: 'GET',
    //    headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       Authorization: `Bearer ${localStorage.getItem('jwt')}`
    //    }})
    //    .then(res => res.json())
    //    .then(res => console.log(res))

    fetch(`http://localhost:3000/api/orders/${order.id}`, {
       method: 'PUT',
       headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
       },
       body: JSON.stringify(
       {
         orderItems: currentOrderItems
       }
      )
    })
    .then(res => res.json())
    .then(json => {
      let currentOrders = this.props.orders
      console.log(currentOrders)
      let matchingOrderIndex = currentOrders.findIndex(existingOrder => existingOrder.id == json.id)
      currentOrders[matchingOrderIndex] = json
      this.props.changeOrders(currentOrders)

    })
  }

  render() {
    if ((Object.keys(this.props.restaurant).length != 0 && Object.keys(this.props.account).length != 0) &&
  (this.props.account.id == this.props.restaurant.account.id)) {
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
