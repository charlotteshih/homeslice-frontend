import React, { useState, useEffect } from "react";
import RestaurantOrderList from "./RestaurantOrderList";
import FetchServices from "../../services/FetchServices";
import IntervalServices from "../../services/IntervalServices";

export default function RestaurantDash({ match }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const hiddenTabStyle = {
    display: "none"
  };

  const [currentTab, setCurrentTab] = useState("New Orders / In Progress");
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
        <button onClick={() => setCurrentTab("New Orders / In Progress")}>
          New Orders / In Progress
        </button>
        <button onClick={() => setCurrentTab("Ready For Pickup")}>
          Ready For Pickup
        </button>
        <button onClick={() => setCurrentTab("Completed")}>Completed</button>
      </section>

      <>
        <section
          style={
            currentTab === "New Orders / In Progress" ? null : hiddenTabStyle
          }
        >
          <h2>New Orders</h2>
          <RestaurantOrderList
            orderListCategory={"Ordered"}
            orders={orders}
            setOrders={setOrders}
            customers={customers}
          />
        </section>
        <section
          style={
            currentTab === "New Orders / In Progress" ? null : hiddenTabStyle
          }
        >
          <h2>In Progress</h2>
          <RestaurantOrderList
            orderListCategory={"In Progress"}
            orders={orders}
            setOrders={setOrders}
            customers={customers}
          />
        </section>
      </>

      <section
        style={currentTab === "Ready For Pickup" ? null : hiddenTabStyle}
      >
        <h2>Ready For Pickup</h2>
        <RestaurantOrderList
          orderListCategory={"Ready For Pickup"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
        />
      </section>

      <section style={currentTab === "Completed" ? null : hiddenTabStyle}>
        <h2>Completed</h2>
        <RestaurantOrderList
          orderListCategory={"Completed"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
        />
      </section>
    </div>
  );
}
