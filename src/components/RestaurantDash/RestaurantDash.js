import React, { useState, useEffect } from "react";
import RestaurantOrderList from "./RestaurantOrderList";
import CancelOrderLightBox from "./CancelOrderLightBox";
import FetchServices from "../../services/FetchServices";
import IntervalServices from "../../services/IntervalServices";

export default function RestaurantDash({ match }) {

  const hiddenTabStyle = {
    display: "none"
  };

  const [currentTab, setCurrentTab] = useState("New Orders / In Progress");
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cancelConfirmVisible, setCancelConfirmVisible] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState({});
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

  const updateOrderStatus = (order_id, status) => {
    FetchServices._updateOrderStatusById(order_id, status)
      .then(res => {
        if (res.status === 204) {
          return;
        }
        throw new Error(res);
      })
      .then(() => {
        return orders.filter(order => {
          if (order.id === order_id) {
            order.order_status = status;
          }
          return order;
        });
      })
      .then(updatedOrdersList => {
        setOrders(updatedOrdersList);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="RestDash__container padding-top-60px">
      <section className="RestDash__list-toggle">
        <button 
          className={`RestDash__list-toggle__btn btn ${currentTab === "New Orders / In Progress"? "selected": ""}`}
          onClick={() => setCurrentTab("New Orders / In Progress")}>
          New Orders / In Progress
        </button>
        <button 
          className={`RestDash__list-toggle__btn btn ${currentTab === "Ready For Pickup"? "selected": ""}`}
          onClick={() => setCurrentTab("Ready For Pickup")}>
          Ready For Pickup
        </button>
        <button 
          className={`RestDash__list-toggle__btn btn ${currentTab === "Completed"? "selected": ""}`}
          onClick={() => setCurrentTab("Completed")}>Completed</button>
      </section>
      {cancelConfirmVisible ? (
        <CancelOrderLightBox
          updateOrderStatus={updateOrderStatus}
          orderToCancel={orderToCancel}
          setOrderToCancel={setOrderToCancel}
          setCancelConfirmVisible={setCancelConfirmVisible}
        />
      ) : (
        ""
      )}

      <>
        <section 
          className={
            currentTab === "New Orders / In Progress" ? "" : 'hidden'
          }>
          <h2 className="RestDash__heading">New Orders</h2>
          <RestaurantOrderList
            orderListCategory={"Ordered"}
            orders={orders}
            setOrders={setOrders}
            customers={customers}
            setOrderToCancel={setOrderToCancel}
            setCancelConfirmVisible={setCancelConfirmVisible}
          />
        </section>
        <section
          className={
            currentTab === "New Orders / In Progress" ? "" : 'hidden'
          }
        >
          <h2 className="RestDash__heading">In Progress</h2>
          <RestaurantOrderList
            orderListCategory={"In Progress"}
            orders={orders}
            setOrders={setOrders}
            customers={customers}
            setOrderToCancel={setOrderToCancel}
            setCancelConfirmVisible={setCancelConfirmVisible}
          />
        </section>
      </>

      <section
        className={
          currentTab === "Ready For Pickup" ? "" : 'hidden'
        }>
        <h2 className="RestDash__heading">Ready For Pickup</h2>
        <RestaurantOrderList
          orderListCategory={"Ready For Pickup"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
          setOrderToCancel={setOrderToCancel}
          setCancelConfirmVisible={setCancelConfirmVisible}
        />
      </section>

      <section style={currentTab === "Completed" ? null : hiddenTabStyle}>
        <h2 className="RestDash__heading">Completed</h2>
        <RestaurantOrderList
          orderListCategory={"Completed"}
          orders={orders}
          setOrders={setOrders}
          customers={customers}
          setOrderToCancel={setOrderToCancel}
          setCancelConfirmVisible={setCancelConfirmVisible}
        />
      </section>
    </div>
  );
}
