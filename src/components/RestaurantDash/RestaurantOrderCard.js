import React, { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";

export default function RestaurantOrderCard(props) {
  

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
      <div className="RestCard__container">
        {props.order.pizza_type 
        ? <img
            className="RestCard__pizza-img"
            src={require(`../../images/${props.order.pizza_type
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`)}
            alt={`${props.order.pizza_type} pizza`}/>
         : <img
            className="RestCard__pizza-img"
            src={require(`../../images/base.png`)}
            alt={`${props.order.pizza_type} pizza`}/>
        }
        <h4 className="RestCard__Heading">{props.order.pizza_type}</h4>
        {props.customerInfo ? (
          <div className="RestCard__cust-data">
            <div className="RestCard__cust-data__item">{`Ordered on: ${props.order.date_created}`}</div>
            <div className="RestCard__cust-data__item">{`Ordered by: ${props.customerInfo.first_name} ${props.customerInfo.last_name}`}</div>
            <div className="RestCard__cust-data__item">
              <a
                className="RestCard__link" 
                href={`mailto:${props.customerInfo.email}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {props.customerInfo.email}
              </a>
            </div>
            <div className="RestCard__cust-data__item">
              <a
                className="RestCard__link"
                href={`tel:${props.customerInfo.phone}`}>
                {props.customerInfo.phone}
              </a>
            </div>
          </div>
        ) : null}
      {props.displayButtons ? (
        <div>
          <button
            className="RestCard__btn btn"
            onClick={() => updateOrderStatus(props.order.id, "In Progress")}
          >
            In Progress
          </button>
          <button
            className="RestCard__btn btn"
            onClick={() =>
              updateOrderStatus(props.order.id, "Ready For Pickup")
            }
          >
            Ready For Pickup
          </button>

          <button
            className="RestCard__btn btn"
            onClick={() => {
              updateOrderStatus(props.order.id, "Completed");
            }}
          >
            Completed
          </button>

          <button
            className="RestCard__btn btn"
            onClick={() => {
              props.setOrderToCancel({
                order: props.order,
                customerInfo: props.customerInfo
              });
              props.setCancelConfirmVisible(true);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        ""
      )}

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
