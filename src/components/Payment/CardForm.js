import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import FetchServices from "../../services/FetchServices";

function CardForm(props) {
  let [paymentSuccessful, setPaymentSuccessful] = useState("");

  function _submitStripe(e) {
    e.preventDefault();
    console.log(props);
    props.stripe.createToken({ name: "Name" }).then(res => {
      if (res.error) {
        throw new Error(res.error);
      }
      let response = FetchServices._makeStripePayment(res.token).then(res => {
        if (res.status === 204) {
          props.setShowCustomerForm(true);
          setPaymentSuccessful("Payment Successful!");
          // console.log(res);
        }
      });
    });
  }

  return (
    <div className="Payment__checkout">
      <CardElement />
      {!paymentSuccessful
        ? <button
          className="Payment__stripe__btn btn"
          onClick={e => _submitStripe(e)}>Submit Payment</button>
        : <h3 style={{ color: "green" }}>{paymentSuccessful}</h3>
      }
    </div>
  );
}

export default injectStripe(CardForm);
