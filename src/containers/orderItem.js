import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const OrderItem = (props) => {
  return (
    <div className="orderItem">
      <p>ID: {props.orderItem.id}</p>
      <p>name: {props.orderItem.name}</p>
      <p>Price: {props.orderItem.price}</p>
      {props.changeOrderItemStatus ?
      <div>
        <p>Status: {props.orderItem.status}</p>
        <div id="restaurants">
          <p>Status</p>
          <DropdownButton id="dropdown-basic-button" title={props.orderItem.status}>
            <Dropdown.Item value="Not Started" onClick={(event) => {props.changeOrderItemStatus(props.order, props.orderItem, event)}}>"Not Started"</Dropdown.Item>
            <Dropdown.Item value="In Progress" onClick={(event) => {props.changeOrderItemStatus(props.order, props.orderItem, event)}}>"In Progress"</Dropdown.Item>
            <Dropdown.Item value="Complete" onClick={(event) => {props.changeOrderItemStatus(props.order, props.orderItem, event)}}>"Complete"</Dropdown.Item>
          </DropdownButton>
          <br/>
          <br/>
        </div>
      </div> : null}
      <button onClick={() => {props.removeOrderItem(props.orderItem)}}> - </button>
    </div>
  )
}

export default OrderItem
