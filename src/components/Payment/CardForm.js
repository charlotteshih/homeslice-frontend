import React, { useState } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import FetchServices from "../../services/FetchServices";

function CardForm(props) {
  let [buttonDisabled, setButtonDisabled] = useState(true);
  let [hasError, setHasError] = useState(true);
  let [errorMessage, setErrorMessage] = useState("");
  let [paymentSuccessful, setPaymentSuccessful] = useState("");

  function _formValid() {
    // enables submit button as long as user has typed something in the payment form
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
          props.setShowCustomerForm(true); // displays customer info form on successful payment - see Payment.js
          setPaymentSuccessful("Payment Successful!");
        }
      })
      .catch(err => {
        // if payment form is incomplete or card info is invalid, throws an error and prompts user to re-submit
        setHasError(true);
        setErrorMessage("Oops! Something went wrong. Please try submitting your payment info again.")
        console.log(err);
      });
  }

  return (
    <div className="Payment__checkout">
      {!paymentSuccessful
        ?
        <> {/* if payment is not successful (i.e. not submitted yet), display payment form */}
          <p>Please enter your payment information below.</p>
          <CardElement onChange={_formValid} />
          {buttonDisabled
          ? <> {/* if nothing is filled out, disable the submit button */}
              <button
                disabled
                className="Payment__stripe__btn btn disabled"
                onClick={e => _submitStripe(e)}>Submit Payment</button>
            </>
          : <> {/* if there is something in the form, enable the submit button */}
              <button
                className="Payment__stripe__btn btn"
                onClick={e => _submitStripe(e)}>Submit Payment</button>
                {/* if incorrect/incomplete info is submitted, display error message */}
                {hasError ? <div style={{ marginTop: "30px", color: "red" }}>{errorMessage}</div> : ''}
            </>}
        </>
        : <> {/* if payment is successful, hide payment form and display success message */}
            <h3 style={{ color: "green" }}>{paymentSuccessful}</h3>
          </>
      }
    </div>
  );
}

export default injectStripe(CardForm);
