import React from "react";
import RestaurantOrderCard from "./RestaurantOrderCard";

export default function RestaurantOrderList(props) {
  let selectedOrders = null;
  const displaySelectedOrders = (orderArray, orderStatus) => {
    console.log("orderArray", orderArray);
    console.log("Array.isArray(orderArray)", Array.isArray(orderArray));
    console.log("orderStatus", orderStatus);
    if (orderArray === undefined || !Array.isArray(orderArray)) {
      return;
    } else {
      if (props.orderListCategory === "Ordered") {
        selectedOrders = orderArray.filter(
          order => order.order_status === "Ordered"
        ).reverse();
      }
      if (props.orderListCategory === "In Progress") {
        selectedOrders = orderArray.filter(
          order => order.order_status === "In Progress"
        ).reverse();
      }
    }
    console.log("selectedOrders", selectedOrders);
    if (selectedOrders) {
      return selectedOrders.map(order => {
        return (
          <RestaurantOrderCard
            key={order.id}
            orders={props.orders}
            order={order}
            setOrders={props.setOrders}
          />
        );
      });
    }
  };
  return (
    <div>
      RestaurantOrderList
      {displaySelectedOrders(props.orders, props.orderListCategory)}
    </div>
  );
}
