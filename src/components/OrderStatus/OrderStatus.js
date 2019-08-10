import React, { useContext, useState, useEffect, useRef } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import config from "../../config";

export default function OrderStatus() {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const context = useContext(GlobalContext);

  const checkOrderStatusInterval = 1000 * 10;

  const restaurantLocation =
    context.RestaurantData.street_address +
    ", " +
    context.RestaurantData.city +
    ", " +
    context.RestaurantData.state;

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  function checkOrderStatus(orderId) {
    fetch(`${config.apiBaseUrl}/orders/${orderId}`)
      .then(res => res.json())
      .then(resJson => {
        context.setOrderData({ ...resJson });
      });
  }

  useInterval(() => {
    checkOrderStatus(context.orderData.id);
  }, checkOrderStatusInterval);

  return (
    <div style={pageStyle}>
      <h1>Order Summary</h1>
      <p>Order Status: {context.orderData.order_status}</p>
      <p>Order Total: {context.orderData.order_total}</p>
      <p>Pickup Location: {restaurantLocation}</p>
      <p>
        <b>
          Please keep this tab open so that you can view your order status in
          real time!
        </b>
      </p>
    </div>
  );
}
