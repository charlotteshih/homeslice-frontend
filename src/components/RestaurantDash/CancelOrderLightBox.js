import React from "react";
import RestaurantOrderCard from "./RestaurantOrderCard";

export default function CancelOrderLightBox(props) {
  let lightBoxStyle = {
    background: "lightgrey",
    position: "absolute",
    padding: "20px",
    zIndex: "10"
  };
  let lightBoxBg = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "rgba(0,0,0,0.5)",
    zIndex: "5"
  };

  function handleCancelConfirm(cancelType) {
    props.setOrderToCancel(props.orderToCancel);
    props.updateOrderStatus(props.orderToCancel.order.id, cancelType);
    props.setCancelConfirmVisible(false);
  }

  return (
    <div style={lightBoxBg}>
      <div style={lightBoxStyle}>
        <h2>Cancel this order?</h2>
        <RestaurantOrderCard
          order={props.orderToCancel.order}
          customerInfo={props.orderToCancel.customerInfo}
          displayButtons={false}
        />
        <button onClick={() => props.setCancelConfirmVisible(false)}>
          Go back
        </button>
        <button
          value="Canceled: Out of stock"
          onClick={e => handleCancelConfirm(e.target.value)}
        >
          Cancel: Out of stock
        </button>
        <button
          value="Canceled: Customer request"
          onClick={e => handleCancelConfirm(e.target.value)}
        >
          Canceled: Customer request
        </button>
        <button
          value="Canceled: Other"
          onClick={e => handleCancelConfirm(e.target.value)}
        >
          Canceled: Other
        </button>
      </div>
    </div>
  );
}
