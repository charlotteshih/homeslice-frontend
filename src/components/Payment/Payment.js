import React, { useContext, useState } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";
import CardForm from "./CardForm";
import { REACT_APP_STRIPE_KEY } from "../../config";
import InputMask from 'react-input-mask';

export default function Payment({ match, history }) {
  let [showCustomerForm, setShowCustomerForm] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street_address, setStreet_Address] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [rememberIsChecked, setRememberIsChecked] = useState(false);

  // form validation variables
  let [emailErr, setEmailErr] = useState("");
  let [phoneErr, setPhoneErr] = useState("");
  let [stateErr, setStateErr] = useState("");
  let [zipcodeErr, setZipcodeErr] = useState("");

  const context = useContext(GlobalContext);

  let savedData = JSON.parse(localStorage.getItem("customerData"));

  function _handleEmailChange(e) {
    const email = e.target.value;

    // checks that email is formatted correctly
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsRegexMatch = emailRegex.test(email);

    !emailIsRegexMatch
      ? setEmailErr("Please provide a valid email.")
      : setEmailErr("");

    setEmail(email);
  }

  function _handlePhoneChange(e) {
    const phone = e.target.value;

    // checks that phone number is formatted correctly
    let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let phoneIsRegexMatch = phoneRegex.test(phone);

    !phoneIsRegexMatch
      ? setPhoneErr("Invalid phone number. Did you include the area code?")
      : setPhoneErr("");

    setPhone(phone);
  }

  function _handleStateChange(e) {
    const state = e.target.value;

    // checks that a state has been selected from the dropdown
    !state ? setStateErr("Please select a state.") : setStateErr("");
    setState(state);
  }

  function _handleZipcodeChange(e) {
    const zipcode = e.target.value;

    // checks that the zipcode input is a 5-digit number
    let zipcodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    let zipcodeIsRegexMatch = zipcodeRegex.test(zipcode);

    !zipcodeIsRegexMatch
      ? setZipcodeErr("Please enter a 5-digit zipcode.")
      : setZipcodeErr("");

    setZipcode(zipcode);
  }

  function handleSubmit(e) {
    e.preventDefault();

    // if the customer info is saved in local state, auto-populate with that info
    const customerData = {
      first_name: firstName ? firstName : savedData.first_name,
      last_name: lastName ? lastName : savedData.last_name,
      email: email ? email : savedData.email,
      phone: phone ? phone : savedData.phone,
      street_address: street_address
        ? street_address
        : savedData.street_address,
      city: city ? city : savedData.city,
      state: state ? state : savedData.state,
      zipcode: zipcode ? zipcode : savedData.zipcode
    };

    FetchServices._submitCreateCustomer(customerData)
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else if (res.status === 400) {
          setEmailErr("Email is already in use.");
        }
        throw new Error(res);
      })
      .then(json => {
        if (rememberIsChecked) {
          localStorage.setItem("customerData", JSON.stringify(json));
        }
        const orderData = {
          restaurant_id: match.params.restaurantId,
          pizza_id: context.pizzaData.id,
          customer_id: context.customerData.id,
          order_status: "Ordered"
        };
        context.setCustomerData({ ...json });
        return FetchServices._submitCreateOrder(orderData);
      })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        }
        throw new Error(res);
      })
      .then(json => {
        context.setOrderData({ ...json });
        history.push(
          `/restaurant/${match.params.restaurantId}/order-status/${
          context.orderData.id
          }`
        );
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="Payment__container padding-top-60px">
      <h1 className="Payment__heading">Payment &amp; Delivery Information</h1>
      {/* Stripe payment form */}
      <StripeProvider apiKey={`${REACT_APP_STRIPE_KEY}`}>
        <Elements>
          <CardForm setShowCustomerForm={setShowCustomerForm} />
        </Elements>
      </StripeProvider>
      {/* customer info form does not display until a successful payment submission - see CardForm.js */}
      {showCustomerForm ? (
        <>
          <p>
            Please enter your contact information to complete your purchase.
          </p>
          <form
            className="Payment__form"
            onSubmit={handleSubmit}>
            <label
              className="Payment__form__label"
              htmlFor="firstNameInput">First Name</label>
            <input
              className="Payment__form__input"
              required
              type="text"
              id="firstNameInput"
              defaultValue={savedData ? savedData.first_name : ""}
              onChange={e => setFirstName(e.target.value)}
            />

            <label
              className="Payment__form__label"
              htmlFor="lastNameInput">Last Name</label>
            <input
              className="Payment__form__input"
              required
              type="text"
              id="lastNameInput"
              defaultValue={savedData ? savedData.last_name : ""}
              onChange={e => setLastName(e.target.value)}
            />

            <label
              className="Payment__form__label"
              htmlFor="emailInput">Email</label>
            <input
              className="Payment__form__input"
              required
              type="email"
              id="emailInput"
              defaultValue={savedData ? savedData.email : ""}
              onChange={e => _handleEmailChange(e)}
            />
            {emailErr ? <div style={{ color: "red" }}>{emailErr}</div> : ""}

            <label
              className="Payment__form__label"
              htmlFor="phoneInput">Phone</label>
            <InputMask
              className="Payment__form__input"
              required
              type="tel"
              id="phoneInput"
              defaultValue={savedData ? savedData.phone : ""}
              onChange={e => _handlePhoneChange(e)}
              mask="(999) 999-9999"
            />
            {phoneErr ? <div style={{ color: "red" }}>{phoneErr}</div> : ""}

            <label
              className="Payment__form__label"
              htmlFor="streetAddressInput">Street Address</label>
            <input
              className="Payment__form__input"
              required
              type="text"
              id="streetAddressInput"
              defaultValue={savedData ? savedData.street_address : ""}
              onChange={e => setStreet_Address(e.target.value)}
            />

            <label
              className="Payment__form__label"
              htmlFor="cityInput">City</label>
            <input
              className="Payment__form__input"
              required
              type="text"
              id="cityInput"
              defaultValue={savedData ? savedData.city : ""}
              onChange={e => setCity(e.target.value)}
            />

            <label
              className="Payment__form__label"
              htmlFor="stateInput">State</label>
            <select
              className="Payment__form__input"
              required
              id="stateInput"
              defaultValue={savedData ? savedData.state : ""}
              onChange={e => _handleStateChange(e)}
            >
              <option value="">Please select a state...</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="DC">District Of Columbia</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {stateErr ? <div style={{ color: "red" }}>{stateErr}</div> : ""}

            <label
              className="Payment__form__label"
              htmlFor="zipcodeInput">Zipcode</label>
            <input
              className="Payment__form__input"
              required
              type="text"
              id="zipcodeInput"
              defaultValue={savedData ? savedData.zipcode : ""}
              onChange={e => _handleZipcodeChange(e)}
            />
            {zipcodeErr ? <div style={{ color: "red" }}>{zipcodeErr}</div> : ""}
            <div>
              <input
                className="Payment__form__remember-me"
                type="checkbox"
                id="rememberMeCheckbox"
                onChange={() => setRememberIsChecked(!rememberIsChecked)} />
              <label
                className="Payment__form__label"
                htmlFor="rememberMeCheckbox">Remember me</label>
            </div>

            {!emailErr && !phoneErr && !stateErr && !zipcodeErr ? (
              <input
                className="btn"
                type="submit"
                value="Place Order" />
            ) : (
                <input
                  className="btn"
                  type="submit"
                  value="Place Order"
                  disabled />
              )}
          </form>
        </>
      ) : (
          ""
        )}
    </div>
  );
}
