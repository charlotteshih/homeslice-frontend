import React, { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";

export default function RestaurantOrderCard(props) {
  const cardStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px black solid",
    padding: "10px"
  };

  const readyForPickupCardStyle = {
    display: "flex",
    alignItems: "center",
    border: "2px black solid",
    padding: "10px",
    backgroundColor: "red"
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

  const [seconds, setSeconds] = useState(0);
  const [isOverdue, setIsOverdue] = useState(false);
  const secondsBeforeOverdue = 60 * 20; // 20 minutes

  useEffect(() => {
    if (props.order.order_status === "Ready For Pickup") {
      let interval = null;
      if (!isOverdue) {
        interval = setInterval(() => {
          if (seconds >= 10) {
            setIsOverdue(true);
          }
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else if (isOverdue) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [isOverdue, seconds]);

  const updateOrderStatus = (order_id, status) => {
    FetchServices._updateOrderStatusById(order_id, status)
      .then(res => {
        if (res.status === 204) {
          return;
        }
        throw new Error(res);
      })
      .then(() => {
        return props.orders.filter(order => {
          if (order.id === order_id) {
            order.order_status = status;
          }
          return order;
        });
      })
      .then(updatedOrdersList => {
        props.setOrders(updatedOrdersList);
      })
      .catch(err => console.error(err));
  };

  return (
    <>
      <div
        style={
          props.order.order_status === "Ready For Pickup" && seconds >= 10
            ? readyForPickupCardStyle
            : cardStyle
        }
      >
        <h3>Order status: {props.order.order_status}</h3>
        <div style={pizzaIconStyle}>{props.order.pizza_size}</div>
        <div style={pizzaTypeStyle}>{props.order.pizza_type}</div>
        <div style={optionButtonsStyle}>
          <button
            onClick={() => updateOrderStatus(props.order.id, "In Progress")}
          >
            Mark In Progress
          </button>
          <button
            onClick={() =>
              updateOrderStatus(props.order.id, "Ready For Pickup")
            }
          >
            Mark Ready For Pickup
          </button>
        </div>
        {isOverdue ? (
          <div>
            It has been over 20 minutes since this order was marked Ready For
            Pickup! <br /> Customer phone number:{" "}
            <a
              href={`tel:${props.customerInfo ? props.customerInfo.phone : ""}`}
            >
              {props.customerInfo ? props.customerInfo.phone : ""}
            </a>
          </div>
        ) : null}
      </div>
    </>
  );
}
