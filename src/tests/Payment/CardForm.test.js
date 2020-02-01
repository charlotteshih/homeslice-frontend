import React from "react";
import CardForm from "../../components/Payment/CardForm";
import { Elements, StripeProvider } from "react-stripe-elements";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(
    <Elements>
      <CardForm/>
    </Elements>);
});