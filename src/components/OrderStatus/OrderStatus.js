
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";
import IntervalServices from "../../services/IntervalServices";
const moment = require('moment');
const tz = require('moment-timezone');

export default function OrderStatus({ match }) {
  const context = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState({ isLoading: true });
  const [isLoadingRestaurant, setIsLoadingRestaurant] = useState({
    isLoadingRestaurant: true
  });
  const [isLoadingPizza, setIsLoadingPizza] = useState({ isLoading: true });
  const [isLoadingOrder, setIsLoadingOrder] = useState({
    isLoadingOrder: true
  });
  const checkOrderStatusInterval = 1000 * 10;
  let orderDateTime = moment(context.orderData.date_created).format('lll');

  useEffect(() => {
    if (
      !context.RestaurantData ||
      context.RestaurantData.id !== match.params.restaurantId
    ) {
      FetchServices._getRestaurantById(match.params.restaurantId)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error(res);
        })
        .then(resJson => {
          return context.setRestaurantData({ ...resJson });
        })
        .then(() => {
          setIsLoadingRestaurant(false);
        });
    } else {
      setIsLoadingRestaurant(false);
    }

    if (!context.orderData || context.orderData.id !== match.params.orderId) {
      FetchServices._getOrderById(match.params.orderId)
        .then(res => {
          if (res.status === 200) {
            return res.json();
          }
          throw new Error(res);
        })
        .then(resJson => {
          return context.setOrderData({ ...resJson });
        })
        .then(newState => {
          if (newState.orderData.hasOwnProperty("pizza_id")) {
            FetchServices._getPizzaById(newState.orderData.pizza_id)
              .then(res => {
                if (res.status === 200) {
                  return res.json();
                }
                throw new Error(res);
              })
              .then(resJson => {
                return context.setPizzaData({ ...resJson });
              })
              .then(() => {
                setIsLoadingPizza(false)
                setIsLoadingOrder(false);
              });
          } else {
            setIsLoadingOrder(false);
            setIsLoadingPizza(false);
          }
        });
    } else {
      setIsLoadingOrder(false);
    }
    if (!isLoadingRestaurant && !isLoadingOrder) {
      setIsLoading(false);
    }
  }, [isLoadingRestaurant, isLoadingOrder]);

  if (!isLoadingRestaurant) {
    var restaurantLocation = (
      <>
        <span>{`${context.restaurantData.name}`}<br />
          {`${context.restaurantData.street_address}`}<br />
          {`${context.restaurantData.city}, ${
            context.restaurantData.state
            } ${context.restaurantData.zipcode}`}<br />
          <a className="RestOrderCard__link" href={`mailto:${context.restaurantData.email}`}>{`${context.restaurantData.email}`}</a><br />
          <a className="RestOrderCard__link" href={`tel:${context.restaurantData.phone}`}>{`${context.restaurantData.phone}`}</a></span>

      </>
    );
  }

  function checkOrderStatus(orderId) {
    FetchServices._getOrderById(orderId)
      .then(res => res.json())
      .then(resJson => {
        context.setOrderData({ ...resJson });
      });
  }

  IntervalServices._useInterval(() => {
    checkOrderStatus(context.orderData.id);
  }, checkOrderStatusInterval);

  if (isLoading) {
    return (
      <div
        className="padding-top-60px" >
        <h1 className="OrderStatus__header">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div
        className="OrderStatus__container padding-top-60px" >
        <h1 className="OrderStatus__header">Order Summary</h1>
        <section className="OrderStatus__card">
          <div className="OrderStatus__order-info">
            <p>
              <b>Order Number: {context.orderData.id}</b>
              <br />
              <b>Order Status: {context.orderData.order_status}</b>
            </p>
          </div>
          <div className="OrderStatus__left">
            <p>
              <img
                className="OrderStatus__pizza-img"
                src={require(`../../images/${context.pizzaData.type
                  .toLowerCase()
                  .replace(/\s+/g, "-")}.png`)}
                alt={`${context.pizzaData.type} pizza`}
              />
            </p>
            <p>
              <b>{context.pizzaData.size} {context.pizzaData.type}</b>
            </p>
          </div>
          <div className="OrderStatus__right">
            <p><b>Ordered On:</b><br />
              {orderDateTime}</p>
            <p>
              <b>Pickup Location:</b><br />
              {restaurantLocation}
            </p>
            <p>
              <b>Order Total: ${context.orderData.order_total}</b>
            </p>
          </div>
          <div className="OrderStatus__please-note">
            <p><b>PLEASE NOTE:</b> For sanitary reasons, pizzas that are not picked up within 60 minutes of completion will be discarded.</p>
          </div>
        </section>
      </div>
    );
  }
}
