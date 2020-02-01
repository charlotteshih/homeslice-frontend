import React, { useState, useEffect } from "react";
import FetchServices from "../../services/FetchServices";
const moment = require('moment');

export default function RestaurantOrderCard(props) {
  //card representing an order from a customer
  const [seconds, setSeconds] = useState(0);
  const [isOverdue, setIsOverdue] = useState(false);
  const secondsBeforeOverdue = 60 * 20; // 20 minutes
  let orderDateTime = moment(props.order.date_created).format('lll');

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
      <div className="RestOrderCard__container">
      {isOverdue ? (
        <div className="RestOrderCard__overdue">
          It has been over 20 minutes since this order was marked Ready For
          Pickup! <br />
        </div>
      ) : null}
        
        <h4 className="RestOrderCard__Heading">{props.order.pizza_type}</h4>
          {props.displayPizza
            ? <img
            className="RestOrderCard__pizza-img"
            src={require(`../../images/${props.order.pizza_type
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`)}
            alt={`${props.order.pizza_type} pizza`}/>
            : ""
          }
        {/* boolean display customer info */}
        {props.customerInfo ? (
          <div className="RestOrderCard__cust-data">
            <div className="RestOrderCard__cust-data__item">{`Ordered on: ${orderDateTime}`}</div>
            <div className="RestOrderCard__cust-data__item">{`Ordered by: ${props.customerInfo.first_name} ${props.customerInfo.last_name}`}</div>
              {props.displayEmail
                ?<div className="RestOrderCard__cust-data__item">
                  <a
                      className="RestOrderCard__link" 
                      href={`mailto:${props.customerInfo.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.customerInfo.email}
                  </a>
                </div>
                : ""
              }
            <div className="RestOrderCard__cust-data__item">
              <span>Phone: </span>
              <a
                className="RestOrderCard__link"
                href={`tel:${props.customerInfo.phone}`}>
                {props.customerInfo.phone}
              </a>
            </div>
          </div>
        ) : null}
      {/* boolean display status change buttons? */}
      {props.displayButtons ? (
        <div className="RestOrderCard__btn-group">
          <button
            className="RestOrderCard__btn btn"
            onClick={() => updateOrderStatus(props.order.id, "In Progress")}
          >
            In Progress
          </button>
          <button
            className="RestOrderCard__btn btn"
            onClick={() =>
              updateOrderStatus(props.order.id, "Ready For Pickup")
            }
          >
            Ready For Pickup
          </button>

          <button
            className="RestOrderCard__btn RestOrderCard__btn-completed btn"
            onClick={() => {
              updateOrderStatus(props.order.id, "Completed");
            }}
          >
            Completed
          </button>

          <button
            className="RestOrderCard__btn RestOrderCard__btn-cancel btn"
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
      </div>
    </>
  );
}
