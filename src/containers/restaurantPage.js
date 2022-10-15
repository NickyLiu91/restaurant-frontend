import React from 'react';

class RestaurantPage extends React.Component {

  state = {
    account: this.props.account,
    restaurant: {},
    menu: [],
    orders: [],
    guest: false
  }

  componentDidMount() {
    let jwt = localStorage.getItem('jwt')

        if (jwt) {
          fetch(`http://localhost:3000/api/restaurants/${this.props.account.restaurants[0].id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              Authorization: `Bearer ${jwt}`
            }
        })
        .then(res => res.json())
        .then(json => {
          this.generateMenu()

          this.setState({restaurant: json, menu: json.menuitems}, () => {
            fetch(`http://localhost:3000/api/orders/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${jwt}`
              }
          })
          .then(res => res.json())
          .then(json => {
            // console.log(json)
            let filteredOrders = json.filter(order => order.restaurant.id == this.state.restaurant.id)
            // console.log(filteredOrders)
            this.setState({
              orders: filteredOrders
            })
          })
          })
        })
    }
  }

  generateMenu = () => {
    let list = this.state.menu
    // console.log(list)

    return list.map(
      item => {
        return (
          <div>
            <p>Name: {item.name}</p>
            <p>Price: {item.price}</p>
          </div>
        )
      }
    )
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
            <p>{this.generateOrderItems(order)}</p>
            <p>Total Price: {order.totalPrice}</p>
            <br/>
            <br/>
          </div>
        )
      }
    )
  }

  swapType = () => {
      this.setState({
        guest: !this.state.guest
      })
  }

  render() {
    console.log(this.state)
    if (Object.keys(this.state.restaurant).length != 0 && !this.state.guest) {
      return(
        <div>
        <button onClick={() => {this.swapType()}}>SWAPPY</button>
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
    } else if (this.state.guest) {
      return(
        <div>
        guest
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

export default RestaurantPage
