import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'

const OrderItem = (props) => {
  return (
    <div className="orderItem">
      <p>name: {props.orderItem.name}</p>
      <p>Price: {props.orderItem.price}</p>
    </div>
  )
}

export default OrderItem
