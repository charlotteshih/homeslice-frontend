import React from "react";
import RestaurantOrderCard from "./RestaurantOrderCard";

export default function CancelOrderLightBox(props) {
  //display lightbox over restaurant dash
  function handleCancelConfirm(cancelType) {
    props.setOrderToCancel(props.orderToCancel);
    props.updateOrderStatus(props.orderToCancel.order.id, cancelType);
    props.setCancelConfirmVisible(false);
  }

  return (
    <div className="RestLightBox__overlay">
      <div className="RestLightBox__container">
        <h2 className="RestLightBox__heading">Cancel this order?</h2>
        <RestaurantOrderCard
          order={props.orderToCancel.order}
          customerInfo={props.orderToCancel.customerInfo}
          displayButtons={false}
          displayEmail={false}
          displayPizza={false}
        />
        <section className="RestLightBox__btn-group">
          <button 
            className="RestLightBox__btn btn"
            onClick={() => props.setCancelConfirmVisible(false)}>
            Go back
          </button>
          <button
            className="RestLightBox__btn RestOrderCard__btn-cancel btn"
            value="Canceled: Out of stock"
            onClick={e => handleCancelConfirm(e.target.value)}
          >
            Cancel
          </button>
        </section>
      </div>
    </div>
  );
}
