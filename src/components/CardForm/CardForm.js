import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import FetchServices from "../../services/FetchServices";

function CardForm(props) {
  let [paymentSuccessful, setPaymentSuccessful] = useState("");

  function _submitStripe(e) {
    e.preventDefault();
    props.stripe.createToken({ name: "Name" }).then(res => {
      console.log("res.token", res.token);
      if (res.error) {
        console.log("res.error", res.error);
        throw new Error(res.error);
      }
      let response = FetchServices._makeStripePayment(res.token.id);
      if (response.ok) {
        setPaymentSuccessful("Payment Successful!");
        console.log("Purchase Complete!");
      }
    });
  }

  return (
    <div className="checkout">
      <CardElement />
      {/* <button onClick={e => _submitStripe(e)}>Submit Payment</button> */}
      {/* {paymentSuccessful ? (
        <div style={{ color: "green" }}>{paymentSuccessful}</div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default injectStripe(CardForm);
