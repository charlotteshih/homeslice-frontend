import React from "react";
import RestaurantOrderCard from "./RestaurantOrderCard";

export default function CancelOrderLightBox(props) {

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
          {/* <button
            className="RestLightBox__btn RestOrderCard__btn-cancel btn"
            value="Canceled: Customer request"
            onClick={e => handleCancelConfirm(e.target.value)}
          >
            Canceled: Customer request
          </button>
          <button
            className="RestLightBox__btn RestOrderCard__btn-cancel btn"
            value="Canceled: Other"
            onClick={e => handleCancelConfirm(e.target.value)}
          >
            Canceled: Other
          </button> */}
        </section>
      </div>
    </div>
  );
}
