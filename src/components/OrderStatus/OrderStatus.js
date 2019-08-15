import React, { useContext, useEffect, useState, useRef } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";
import IntervalServices from "../../services/IntervalServices";

export default function OrderStatus({ match }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

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
          if (!context.pizzaData.hasOwnProperty("size")) {
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
              .then(() => setIsLoadingPizza(false));
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
        <div>{`${context.restaurantData.name}`}</div>
        <div>{`${context.restaurantData.street_address}`}</div>
        <div>{`${context.restaurantData.city}, ${
          context.restaurantData.state
        } ${context.restaurantData.zipcode}`}</div>
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
      <div style={pageStyle}>
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div style={pageStyle}>
        <h1>Order Summary</h1>
        <p>
          <span>Order Number:</span> {context.orderData.id}
          <br />
          <span>Order Status:</span> {context.orderData.order_status}
        </p>
        <p>
          <img
            src={require(`../../images/${context.pizzaData.type
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`)}
            alt={`${context.pizzaData.type} pizza`}
          />
        </p>
        <p>
          {context.pizzaData.size} {context.pizzaData.type}
        </p>
        <p>
          <span>Order Total:</span> ${context.orderData.order_total}
        </p>
        <p>
          <span>Pickup Location:</span> {restaurantLocation}
        </p>
        <p>
          <b>
            Please keep this tab open so that you can view your order status in
            real time!
          </b>
        </p>
      </div>
    );
  }
}
