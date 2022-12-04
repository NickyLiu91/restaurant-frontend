import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'

const OrderItem = (props) => {
  console.log(props)
  return (
    <div className="orderItem">
      <p>name: {props.orderItem.name}</p>
      <p>Price: {props.orderItem.price}</p>
      <p>Status: {props.orderItem.status}</p>
      <button onClick={() => {this.props.removeOrderItem(props.orderItem)}}> - </button>
    </div>
  )
}

export default OrderItem
