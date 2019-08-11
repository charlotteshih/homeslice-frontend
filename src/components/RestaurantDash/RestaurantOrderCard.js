import React from "react";
import FetchServices from "../../services/FetchServices";

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

  const updateOrderStatus = (order_id, status) => {
    FetchServices._updateOrderStatusById(order_id, status)
    .then(res => {
      if(res.status === 204 ) {
        return;
      }
      throw new Error(res);
    })
    .then(() => {
      return props.orders.filter((order) => {
        if(order.id === order_id) {
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
      <div style={cardStyle}>
        <h3>Order status: {props.order.order_status}</h3>
        <div style={pizzaIconStyle}>{props.order.pizza_size}</div>
        <div style={pizzaTypeStyle}>{props.order.pizza_type}</div>
        <div style={optionButtonsStyle}>
          <button onClick={() => updateOrderStatus(props.order.id, "In Progress")}>
            Mark In Progress
          </button>
          <button onClick={() => updateOrderStatus(props.order.id, "Ready For Pickup")}>
            Mark Ready For Pickup
          </button>
        </div>
      </div>
    </>
  );
}
