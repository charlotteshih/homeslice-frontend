import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import FetchServices from "../../services/FetchServices";

function CardForm(props) {
  let [paymentSuccessful, setPaymentSuccessful] = useState("");

  const _submitStripe = e => {
    e.preventDefault();
    let { token } = props.stripe.createToken({ name: "Name" });
    console.log("token", token);
    let response = FetchServices._makeStripePayment(token);
    if (response.ok) {
      setPaymentSuccessful("Payment Successful!");
      console.log("Purchase Complete!");
    }
  };

  return (
    <div className="checkout">
      <p>Please enter your payment information to complete your purchase.</p>
      <CardElement />
      <button onClick={e => _submitStripe(e)}>Next</button>
      {paymentSuccessful}
    </div>
  );
}

export default injectStripe(CardForm);
