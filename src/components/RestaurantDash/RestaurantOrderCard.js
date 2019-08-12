import React, { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";

export default function RestaurantOrderCard(props) {
  const cardStyle = {
    border: "2px black solid",
    padding: "10px"
  };

  const pizzaAndCustomerStyle = {
    display: "flex",
    alignItems: "center"
  };

  const readyForPickupCardStyle = {
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

  const customerInformation = {
    height: "100px",
    width: "200px",
    border: "2px black solid",
    margin: "0 10px 0 10px",
    fontSize: "10px"
  };

  const optionButtonsStyle = {
    display: "flex"
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
          props.order.order_status === "Ready For Pickup" && isOverdue
            ? readyForPickupCardStyle
            : cardStyle
        }
      >
        <div style={pizzaAndCustomerStyle}>
          <div>
            <div style={pizzaIconStyle}>{props.order.pizza_size}</div>
            <p>{props.order.pizza_type}</p>
          </div>
          {props.customerInfo ? (
            <div style={customerInformation}>
              Ordered on: {props.order.date_created}
              <br />
              Ordered by: <br />
              <ul>
                <li>
                  {`${props.customerInfo.first_name} ${
                    props.customerInfo.last_name
                  }`}
                </li>
                <li>
                  <a
                    href={`mailto:${props.customerInfo.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.customerInfo.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${props.customerInfo.phone}`}>
                    {props.customerInfo.phone}
                  </a>
                </li>
              </ul>
            </div>
          ) : null}
        </div>

        <div style={optionButtonsStyle}>
          <button
            onClick={() => updateOrderStatus(props.order.id, "In Progress")}
          >
            In Progress
          </button>
          <button
            onClick={() =>
              updateOrderStatus(props.order.id, "Ready For Pickup")
            }
          >
            Ready For Pickup
          </button>

          <button
            onClick={() => {
              // CHECK THIS CODE - an unrelated bug is preventing me from testing whether this works as intended
              updateOrderStatus(props.order.id, "Completed");
            }}
          >
            Completed
          </button>
          <label htmlFor="cancel-select">
            Need to cancel? Choose a reason:
          </label>
          <select
            id="cancel-select"
            onChange={e => {
              // CHECK THIS CODE - an unrelated bug is preventing me from testing whether this works as intended
              updateOrderStatus(props.order.id, e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value="Please choose an option:">
              Please choose an option:
            </option>
            <option value="Canceled: Out of stock">
              Canceled: Out of stock
            </option>
            <option value="Canceled: Customer request">
              Canceled: Customer request
            </option>
            <option value="Canceled: Other">Canceled: Other</option>
          </select>
        </div>
        {isOverdue ? (
          <div>
            It has been over 20 minutes since this order was marked Ready For
            Pickup! <br />
          </div>
        ) : null}
      </div>
    </>
  );
}
