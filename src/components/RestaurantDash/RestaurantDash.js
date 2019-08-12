import React, { useState, useEffect } from "react";
import RestaurantOrderList from "./RestaurantOrderList";
import FetchServices from "../../services/FetchServices";
import IntervalServices from "../../services/IntervalServices";

export default function RestaurantDash({ match }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const checkOrdersAndCustomersInterval = 1000 * 10;

  useEffect(() => {
    FetchServices._getOrdersAndCustomersById(match.params.restaurantId)
      .then(res => res.json())
      .then(res => {
        setOrders(res.orders);
        setCustomers(res.customers);
      });
  }, []);

  IntervalServices._useInterval(() => {
    FetchServices._getOrdersAndCustomersById(match.params.restaurantId)
      .then(res => res.json())
      .then(res => {
        setOrders(res.orders);
        setCustomers(res.customers);
      });
  }, checkOrdersAndCustomersInterval);

  return (
    <div style={pageStyle}>
      <section>
        <h2>New Orders</h2>
        <RestaurantOrderList
          orderListCategory={"Ordered"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
        />
      </section>
      <section>
        <h2>In Progress</h2>
        <RestaurantOrderList
          orderListCategory={"In Progress"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
        />
      </section>
      <section>
        <h2>Ready For Pickup</h2>
        <RestaurantOrderList
          orderListCategory={"Ready For Pickup"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
        />
      </section>
    </div>
  );
}
