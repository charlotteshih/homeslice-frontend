import React, { useContext, useState, useEffect } from "react";
import config from "../../config";

export default function RestaurantOrderCard(props) {
  console.log("props.order", props.order);

  const cardStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px black solid",
    padding: "10px"
  };

  const pizzaIconStyle = {
    height: "75px",
    width: "75px",
    borderRadius: "50%",
    backgroundColor: "gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  };

  const pizzaTypeStyle = {
    height: "100px",
    width: "200px",
    border: "2px black solid",
    margin: "0 10px 0 10px"
  };

  const optionButtonsStyle = {
    display: "flex",
    flexDirection: "column"
  };

  const markInProgress = order_id => {
    fetch(`${config.apiBaseUrl}/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        order_status: "In Progress"
      })
    }).then(res => {
      const updatedOrders = props.orders.filter(order => {
        if (order.id === order_id) {
          order.order_status = "In Progress";
        }
        return order;
      });
      props.setOrders(updatedOrders);
      console.log(res);
    });
  };

  const markReadyForPickup = order_id => {
    fetch(`${config.apiBaseUrl}/orders/${order_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        order_status: "Ready For Pickup"
      })
    }).then(res => {
      const updatedOrders = props.orders.filter(order => {
        if (order.id === order_id) {
          order.order_status = "Ready For Pickup";
        }
        return order;
      });
      props.setOrders(updatedOrders);
      console.log(res);
    });
  };

  return (
    <>
      <div style={cardStyle}>
        <h3>Order status: {props.order.order_status}</h3>
        <div style={pizzaIconStyle}>{props.order.pizza_size}</div>
        <div style={pizzaTypeStyle}>{props.order.pizza_type}</div>
        <div style={optionButtonsStyle}>
          <button onClick={() => markInProgress(props.order.id)}>
            Mark In Progress
          </button>
          <button onClick={() => markReadyForPickup(props.order.id)}>
            Mark Ready For Pickup
          </button>
        </div>
      </div>
    </>
  );
}
