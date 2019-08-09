import React, { useState, useEffect } from "react";
import RestaurantOrderList from "./RestaurantOrderList";
import FetchServices from '../../services/FetchServices';

export default function RestaurantDash({ match }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    FetchServices._getOrdersAndCustomersById(match.params.restaurantId)
    .then(res => res.json())
    .then(res => {
      setOrders(res.orders);
    });
  }, []);


  return (
    <div style={pageStyle}>
      <button onClick={() => {
        FetchServices._getOrdersAndCustomersById(match.params.restaurantId);
        }}>
        Refresh
      </button>
      <section>
        <h2>New Orders</h2>
        <RestaurantOrderList
          orderListCategory={"Ordered"}
          orders={orders}
          setOrders={setOrders}
        />
      </section>
      <section>
        <h2>In Progress</h2>
        <RestaurantOrderList
          orderListCategory={"In Progress"}
          orders={orders}
          setOrders={setOrders}
        />
      </section>
    </div>
  );
}
