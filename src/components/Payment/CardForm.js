import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import FetchServices from "../../services/FetchServices";

function CardForm(props) {
  let [buttonDisabled, setButtonDisabled] = useState(true);
  let [hasError, setHasError] = useState(true);
  let [errorMessage, setErrorMessage] = useState("");
  let [paymentSuccessful, setPaymentSuccessful] = useState("");

  function _formValid() {
    setButtonDisabled(false);
  }

  function _submitStripe(e) {
    e.preventDefault();
    props.stripe.createToken({ name: "Name" })
      .then(res => {
        if (res.error) {
          throw new Error(res.error);
        }
        return FetchServices._makeStripePayment(res.token)
      })
      .then(res => {
        if (res.status === 204) {
          props.setShowCustomerForm(true);
          setPaymentSuccessful("Payment Successful!");
        }
      })
      .catch(err => {
        setHasError(true);
        setErrorMessage("Oops! Something went wrong. Please try submitting your payment info again.")
        console.log(err);
      });
  }

  return (
    <div className="Payment__checkout">
      {!paymentSuccessful
        ? 
        <>
          <CardElement onChange={_formValid} />
          {buttonDisabled
          ? <button
              disabled
              className="Payment__stripe__btn btn disabled"
              onClick={e => _submitStripe(e)}>Submit Payment</button>
          : <>
              <button
                className="Payment__stripe__btn btn"
                onClick={e => _submitStripe(e)}>Submit Payment</button>
                {hasError ? <div style={{ marginTop: "30px", color: "red" }}>{errorMessage}</div> : ''}
            </>}
        </>
        : <h3 style={{ color: "green" }}>{paymentSuccessful}</h3>
      }
    </div>
  );
}

export default injectStripe(CardForm);
