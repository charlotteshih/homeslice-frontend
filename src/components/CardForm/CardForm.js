import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import FetchServices from '../../services/FetchServices';

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentSuccessful: ''
    }
  }

  render() {
    const _submitStripe = e => {
      e.preventDefault();
      let { token } = this.props.stripe.createToken({ name: "Name" });
      console.log('token', token);
      let response = FetchServices._makeStripePayment(token);
      if (response.ok) {
        this.setState({
          paymentSuccessful: 'Payment Successful!'
        });
        console.log("Purchase Complete!");
      }
    };

    return (
      <div className="checkout">
        <p>Please enter your payment information to complete your purchase.</p>
        <CardElement />
        <button onClick={e => _submitStripe(e)}>Next</button>
        {this.state.paymentSuccessful}
      </div>
    );
  }
}

export default injectStripe(CardForm);
