import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import OrderItem from './orderItem';
import {v4 as uuidv4} from 'uuid'
import StripeContainer from './stripeContainer'



class RestaurantPage extends React.Component {

  state = {
    currentOrder: [],
    submittedCurrentOrder: {},
    orders: [],
    restaurantId: '',
    currentOrderPrice: 0
  }

  componentDidMount(){
    let url = this.props.match.url.slice(13)
    let restaurantId = ""
    let index = 0
    while (url[index] != "/" && index < url.length) {
      restaurantId += url[index]
      index ++
    }
    this.setState({
      restaurantId: restaurantId
    })

    if (this.props.match.url.slice(-6) == "online"){
      let adjustedAddress = this.props.match.url.slice(0, -7)
      this.props.changeLocation("online")
    } else {
      this.props.changeLocation("offline")
    }

    fetch(`http://localhost:3000/api/restaurants/${restaurantId}/menu`)
    .then(res => res.json())
    .then(json => {
      this.props.changeRestaurant(json)
      this.props.changeMenu(json.menuitems)
      this.props.changeOrders(json.orders)
    })
  }

  generateMenu = () => {
    console.log(this.state)
    let list = this.props.menu
    console.log(list)

    return this.props.menu.map(
      item => {
        return (
          <div>
            <p>Name: {item.name}</p>
            {item.image ? <img src={item.image.url}></img> : null}
            <p>Price: {parseFloat(item.price)}</p>
            {Object.keys(this.props.restaurant).length != 0 ? <button onClick={() => {this.addToOrder(item)}}> + </button> : null}
          </div>
        )
      }
    )
  }

  addToOrder = (item) => {
    let newOrderList = this.state.currentOrder
    let newOrderPrice = 0

    newOrderList = [...newOrderList, {name: item.name, price: parseFloat(item.price), id: uuidv4(), status: "Not Started"}]

    newOrderList.forEach(item => {newOrderPrice += parseFloat(item.price)})

    this.setState({
      currentOrder: newOrderList,
      currentOrderPrice: newOrderPrice
    })
  }

  removeOrderItem = (item) => {

    let newOrderPrice = 0

    if (Object.keys(this.state.submittedCurrentOrder).length == 0 ) {
      let newOrderList = this.state.currentOrder
      let matchingItemIndex = newOrderList.findIndex(existingItem => existingItem.id == item.id)

      newOrderList.splice(matchingItemIndex, 1)

      newOrderList.forEach(item => {newOrderPrice += parseFloat(item.price)})

      this.setState({
        currentOrder: newOrderList,
        currentOrderPrice: newOrderPrice
      })
    }
    // else {
      // alert("That item is currently being prepared and cannot be cancelled.")
    //   fetch(`http://localhost:3000/api/orders/${this.state.currentOrder.id}`, {
    //      method: 'GET',
    //      headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         Authorization: `Bearer ${localStorage.getItem('jwt')}`
    //      }})
    //      .then(res => res.json())
    //      .then(res => console.log(res))
    // }

    // Allow access to edit when not loggedin?
  }

  generateOrderItems = (order) => {
    let list = order.orderItems

    return list.map(
      orderItem => {
        console.log(orderItem)
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
        console.log(order)
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
    let list
    if (Object.keys(this.state.submittedCurrentOrder).length != 0) {
      list = this.state.submittedCurrentOrder.orderItems

      return list.map(
        orderItem => {
          return (
            <div>
              <OrderItem key={orderItem.id} orderItem={orderItem} removeOrderItem={this.removeOrderItem}/>
            </div>
          )
        }
      )
    } else {
      list = this.state.currentOrder

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
  }

  submitOrder = () => {

    let currentOrderCopy = [...this.state.currentOrder]
    // let currentPrice = 0

    // currentOrderCopy.forEach(item => {currentPrice += parseFloat(item.price)})

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
            totalPrice: this.state.currentOrderPrice
         }
       }
      )
    })
    .then(res => res.json())
    .then(json => {
      this.setState({
        submittedCurrentOrder: json
      })
    })
  }

  changeOrderItemStatus = (order, orderItem, event) => {
    let currentOrderItems = order.orderItems
    let matchingItemIndex = currentOrderItems.findIndex(existingItem => existingItem.id == orderItem.id)

    currentOrderItems[matchingItemIndex].status = event.target.text

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
      let currentOrders = [...this.props.orders]

      let matchingOrderIndex = currentOrders.findIndex(existingOrder => existingOrder.id == json.id)
      currentOrders[matchingOrderIndex] = json
      this.props.changeOrders(currentOrders)
    })
  }

  inputPaymentInfo = () => {
    this.setState({
      stripe: !this.state.stripe
    })
  }

  render() {
    // console.log(this.props.restaurant.accounts.find(account => account.id == this.props.account.id))
    if ((Object.keys(this.props.restaurant).length != 0 && Object.keys(this.props.account).length != 0) &&
  ((this.props.account.id == this.props.restaurant.account.id) || this.props.restaurant.accounts.find(account => account.id == this.props.account.id))) {
      return(
        <div>
        <button onClick={() => {console.log(this.props)}}>State</button>
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
          <button onClick={() => {console.log(this.props)}}>State</button>
        <div>
          <h1>MENU</h1>
          {this.generateMenu()}
        </div>
        <div>
          <h1>Current Order</h1>
          {this.generateCurrentOrder()}
        </div>
        <p>Total Price: {this.state.currentOrderPrice}</p>
        
        {(Object.keys(this.state.currentOrder).length != 0 && this.props.location == 'online')?

            <StripeContainer currentOrderPrice={this.state.currentOrderPrice} submitOrder={this.submitOrder}/>

         : <button onClick={() => {this.submitOrder()}}>Submit Order</button>}
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
