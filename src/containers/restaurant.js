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
    let restaurantId
    if (this.props.match.url.slice(-6) == "online"){
      let adjustedAddress = this.props.match.url.slice(0, -7)
      // console.log(adjustedAddress)
      // console.log(adjustedAddress.slice(12))
      // restaurantId = adjustedAddress.slice(12)
      restaurantId = adjustedAddress.slice(12)
    } else {
      restaurantId = this.props.match.url.slice(12)
    }

    fetch(`http://localhost:3000/api/restaurants/menu/${restaurantId}`)
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
            {Object.keys(this.props.restaurant).length != 0 ? <button onClick={() => {this.removeOrderItem(item)}}> - </button> : null}
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
            {this.generateOrderItems(order)}
            <p>Total Price: {order.totalPrice}</p>
            <br/>
            <br/>
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
              <p>name: {orderItem.name}</p>
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
