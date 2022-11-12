import React from 'react';
import { Route, Link, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

class RestaurantPage extends React.Component {

  state = {
    account: this.props.account,
    restaurant: {},
    menu: [],
    orders: [],
    guest: false,
    currentOrder: []
  }

  // componentDidMount() {
  //   let jwt = localStorage.getItem('jwt')
  //
  //       if (jwt) {
  //         fetch(`http://localhost:3000/api/restaurants/${this.props.account.restaurants[0].id}`, {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Accept': 'application/json',
  //             Authorization: `Bearer ${jwt}`
  //           }
  //       })
  //       .then(res => res.json())
  //       .then(json => {
  //         this.generateMenu()
  //
  //         this.setState({restaurant: json, menu: json.menuitems}, () => {
  //           fetch(`http://localhost:3000/api/orders/`, {
  //             method: 'GET',
  //             headers: {
  //               'Content-Type': 'application/json',
  //               'Accept': 'application/json',
  //               Authorization: `Bearer ${jwt}`
  //             }
  //         })
  //         .then(res => res.json())
  //         .then(json => {
  //           // console.log(json)
  //           let filteredOrders = json.filter(order => order.restaurant.id == this.state.restaurant.id)
  //           // console.log(filteredOrders)
  //           this.setState({
  //             orders: filteredOrders
  //           })
  //         })
  //         })
  //       })
  //   }
  // }

  componentDidMount(){
    let restaurantId = this.props.match.url.slice(12)

    fetch(`http://localhost:3000/api/restaurants//menu/${restaurantId}`)
    .then(res => res.json())
    .then(json => {
      this.props.changeRestaurant(json)
      this.props.changeMenu(json.menuitems)
    })
  }

  generateMenu = () => {
    let list = this.props.menu
    // console.log(list)

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
    // let ordersCopy = this.state.orders
    let newOrderList = this.state.currentOrder
    // console.log(this.state.restaurant)
    newOrderList = [...newOrderList, {name: item.name, price: parseFloat(item.price)}]
    this.setState({
      currentOrder: newOrderList
    })
  }

  generateOrderItems = (order) => {
    let list = order.orderItems

    return list.map(
      orderItem => {
        return (
          <div>
            <p>name: {orderItem.name}</p>
            <p>Price: {orderItem.price}</p>
            <br/>
          </div>
        )
      }
    )
  }

  generateOrders = () => {
    let list = this.state.orders

    return list.map(
      order => {
        return (
          <div>
            <p>Order ID: {order.id}</p>
            <p>location: {order.location}</p>
            {this.generateOrderItems(order)}
            <p>Total Price: {order.totalPrice}</p>
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
    console.log(this.state.currentOrder)

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
    .then(json => {console.log(json)})
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
    menu: state.menuChanger.menu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeAccount: (event) => dispatch({type: "CHANGE_ACCOUNT", newAccount: event}),
    changeRestaurant: (event) => dispatch({type: "CHANGE_RESTAURANT", newRestaurant: event}),
    changeMenu: (event) => dispatch({type: "CHANGE_MENU", newMenu: event})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPage)
