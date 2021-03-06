import React from "react";
import RestaurantOrderCard from "./RestaurantOrderCard";

export default function RestaurantOrderList(props) {
  let selectedOrders = null;
  //create list according to what category is passed in via props.
  const displaySelectedOrders = orderArray => {
    if (orderArray === undefined || !Array.isArray(orderArray)) {
      return;
    } else {
      if (props.orderListCategory === "Ordered") {
        selectedOrders = orderArray
          .filter(order => order.order_status === "Ordered")
          .reverse();
      }
      if (props.orderListCategory === "In Progress") {
        selectedOrders = orderArray
          .filter(order => order.order_status === "In Progress")
          .reverse();
      }
      if (props.orderListCategory === "Ready For Pickup") {
        selectedOrders = orderArray
          .filter(order => order.order_status === "Ready For Pickup")
          .reverse();
      }
      if (props.orderListCategory === "Completed") {
        selectedOrders = orderArray
          .filter(order => order.order_status === "Completed")
          .reverse();
      }
    }
    if (selectedOrders) {
      return selectedOrders.map(order => {
        let customerInfo = props.customers.filter(
          customer => customer.id === order.customer_id
        );
        return (
          <RestaurantOrderCard
            key={order.id}
            orders={props.orders}
            order={order}
            setOrders={props.setOrders}
            customerInfo={customerInfo[0]}
            setOrderToCancel={props.setOrderToCancel}
            setCancelConfirmVisible={props.setCancelConfirmVisible}
            displayButtons={true}
            displayPizza={true}
          />
        );
      });
    }
  };
  return (
    <div>{displaySelectedOrders(props.orders, props.orderListCategory)}</div>
  );
}
