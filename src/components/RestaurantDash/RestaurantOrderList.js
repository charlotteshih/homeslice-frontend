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
        );
      }
      if (props.orderListCategory === "In Progress") {
        selectedOrders = orderArray.filter(
          order => order.order_status === "In Progress"
        );
      }
    }
    console.log("selectedOrders", selectedOrders);
    if (selectedOrders) {
      return selectedOrders.map(order => {
        return (
          <RestaurantOrderCard
            key={order.id}
            order={order}
            changeOrderStatus={() => props.changeOrderStatus}
          />
        );
      });
    }
  };
  return (
    <div>
      RestaurantOrderList
      {displaySelectedOrders(props.fetchedOrders, props.orderListCategory)}
    </div>
  );
}
