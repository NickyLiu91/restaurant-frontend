import React from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const OrderItem = (props) => {
  return (
    <div className="orderItem">
      <p>name: {props.orderItem.name}</p>
      <p>Price: {props.orderItem.price}</p>
      <p>Status: {props.orderItem.status}</p>
      <div id="restaurants">
        <p>Status</p>
        <DropdownButton id="dropdown-basic-button" title={props.orderItem.status}>
          <Dropdown.Item value={"Not Started"}>{"Not Started"}</Dropdown.Item>
          <Dropdown.Item value={"In Progress"}>{"In Progress"}</Dropdown.Item>
          <Dropdown.Item value={"Complete"}>{"Complete"}</Dropdown.Item>
        </DropdownButton>
        <br/>
        <br/>
      </div>
      <button onClick={() => {props.removeOrderItem(props.orderItem)}}> - </button>
    </div>
  )
}

export default OrderItem
