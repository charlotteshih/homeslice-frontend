import React, { useContext, useState } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";

export default function Payment({ match, history }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  };

  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const imageStyle = {
    margin: "0 auto",
    width: "300px",
    marginBottom: "30px"
  };

  const context = useContext(GlobalContext);
  let savedData = JSON.parse(localStorage.getItem("customerData"));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street_address, setStreet_Address] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [pizzaSize, setPizzaSize] = useState(context.pizzaData.size);
  const [pizzaType, setPizzaType] = useState(context.pizzaData.type);
  const [pizzaBasePrice, setPizzaBasePrice] = useState(
    Number(context.pizzaData.basePrice)
  );
  const [pizzaAddlPrice, setPizzaAddlPrice] = useState(
    Number(context.pizzaData.addlPrice)
  );
  let [sizeChanged, setSizeChanged] = useState(false);
  let [typeChanged, setTypeChanged] = useState(false);
  let [pizzaChanged, setPizzaChanged] = useState("");

  let [emailErr, setEmailErr] = useState("");
  let [phoneErr, setPhoneErr] = useState("");
  let [stateErr, setStateErr] = useState("");
  let [zipcodeErr, setZipcodeErr] = useState("");
  let [changeErr, setChangeErr] = useState("");
  let [sizeErr, setSizeErr] = useState("");
  let [typeErr, setTypeErr] = useState("");

  function _handleEmailChange(e) {
    const email = e.target.value;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let emailIsRegexMatch = emailRegex.test(email);

    !emailIsRegexMatch
      ? setEmailErr("Please provide a valid email.")
      : setEmailErr("");

    setEmail(email);
  }

  function _handlePhoneChange(e) {
    const phone = e.target.value;
    let phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
    let phoneIsRegexMatch = phoneRegex.test(phone);

    !phoneIsRegexMatch
      ? setPhoneErr("Invalid phone number. Did you include the area code?")
      : setPhoneErr("");

    setPhone(phone);
  }

  function _handleStateChange(e) {
    const state = e.target.value;
    !state ? setStateErr("Please select a state.") : setStateErr("");
    setState(state);
  }

  function _handleZipcodeChange(e) {
    const zipcode = e.target.value;
    let zipcodeRegex = /^\d{5}(?:[-\s]\d{4})?$/;
    let zipcodeIsRegexMatch = zipcodeRegex.test(zipcode);

    !zipcodeIsRegexMatch
      ? setZipcodeErr("Please enter a 5-digit zipcode.")
      : setZipcodeErr("");

    setZipcode(zipcode);
  }

  const _handlePizzaSizeChange = e => {
    e.preventDefault();

    let pizzaSize = e.target.value;
    !pizzaSize ? setSizeErr("Please select a pizza size.") : setSizeErr("");

    let basePrice = 0;

    switch (pizzaSize) {
      case "Small":
        basePrice = 9;
        break;
      case "Medium":
        basePrice = 10;
        break;
      case "Large":
        basePrice = 11;
        break;
      case "X-Large":
        basePrice = 12;
        break;
      default:
        basePrice = 0;
    }

    setPizzaSize(pizzaSize);
    setPizzaBasePrice(basePrice);
    setSizeChanged(true);
  };

  const _handlePizzaTypeChange = e => {
    e.preventDefault();

    let pizzaType = e.target.value;
    !pizzaType ? setTypeErr("Please select a type of pizza.") : setTypeErr("");

    let addlPrice = 0;

    switch (pizzaType) {
      case "Cheese":
        addlPrice = 0;
        break;
      case "Pepperoni":
        addlPrice = 2;
        break;
      case "Supreme":
        addlPrice = 3;
        break;
      case "Veggie":
        addlPrice = 1;
        break;
      case "Hawaiian":
        addlPrice = 2;
        break;
      case "BBQ Chicken":
        addlPrice = 2;
        break;
      default:
        addlPrice = 0;
    }

    setPizzaType(pizzaType);
    setPizzaAddlPrice(addlPrice);
    setTypeChanged(true);
  };

  function handleUpdatePizza(e) {
    e.preventDefault();

    const pizzaData = {
      size: pizzaSize,
      type: pizzaType
    };

    FetchServices._updatePizzaById(context.pizzaData.id, pizzaData)
      .then(res => {
        if (res.status === 204) {
          setPizzaChanged("Order updated!");
          return res.json();
        } else {
          setChangeErr("No change to order.");
        }
        throw new Error(res);
      })
      .then(json => {
        return context.setPizzaData({ ...json });
      });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const customerData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      street_address,
      city,
      state,
      zipcode
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
        localStorage.setItem("customerData", JSON.stringify(json));
        return context.setCustomerData({ ...json });
      })
      .then(updatedState => {
        const orderData = {
          restaurant_id: match.params.restaurantId,
          pizza_id: updatedState.pizzaData.id,
          customer_id: updatedState.customerData.id,
          order_status: "Ordered"
        };
        return FetchServices._submitCreateOrder(orderData);
      })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        }
        throw new Error(res);
      })
      .then(json => {
        return context.setOrderData({ ...json });
      })
      .then(updatedState => {
        history.push(
          `/restaurant/${match.params.restaurantId}/order-status/${
            updatedState.orderData.id
          }`
        );
      })
      .catch(err => console.error(err));
  }

  return (
    <div style={pageStyle}>
      <h1>Review Your Order</h1>
      <form style={formStyle} onSubmit={handleUpdatePizza}>
        {pizzaType.length ? (
          <img
            style={imageStyle}
            src={require(`../../images/${pizzaType
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`)}
            alt={`${pizzaType} pizza`}
          />
        ) : (
          <img
            style={imageStyle}
            src={require(`../../images/base.png`)}
            alt={`${pizzaType} pizza`}
          />
        )}
        {changeErr ? <div style={{ color: "red" }}>{changeErr}</div> : ""}
        {sizeErr ? <div style={{ color: "red" }}>{sizeErr}</div> : ""}
        {typeErr ? <div style={{ color: "red" }}>{typeErr}</div> : ""}
        <label htmlFor="pizzaSize">Size</label>
        <select
          id="pizzaSize"
          value={pizzaSize}
          onChange={e => _handlePizzaSizeChange(e)}
        >
          <option value="">Please select a size...</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="X-Large">X-Large</option>
        </select>

        <label htmlFor="pizzaType">Type</label>
        <select
          id="pizzaType"
          value={pizzaType}
          onChange={e => _handlePizzaTypeChange(e)}
        >
          <option value="">Please select a type...</option>
          <option value="Cheese">Cheese</option>
          <option value="Pepperoni">Pepperoni</option>
          <option value="Supreme">Supreme</option>
          <option value="Veggie">Veggie</option>
          <option value="Hawaiian">Hawaiian</option>
          <option value="BBQ Chicken">BBQ Chicken</option>
        </select>

        <span>
          Subtotal: <b>${pizzaBasePrice + pizzaAddlPrice}.00</b>
        </span>

        {sizeChanged || typeChanged ? (
          <input type="submit" value="Edit Order" />
        ) : (
          <input type="submit" value="Edit Order" disabled />
        )}
        {pizzaChanged ? (
          <div style={{ color: "green" }}>{pizzaChanged}</div>
        ) : (
          ""
        )}
      </form>
      <hr />
      <h1>Payment</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="firstNameInput">First Name</label>
        <input
          required
          type="text"
          id="firstNameInput"
          defaultValue={savedData ? savedData.first_name : ""}
          onChange={e => setFirstName(e.target.value)}
        />

        <label htmlFor="lastNameInput">Last Name</label>
        <input
          required
          type="text"
          id="lastNameInput"
          defaultValue={savedData ? savedData.last_name : ""}
          onChange={e => setLastName(e.target.value)}
        />

        <label htmlFor="emailInput">Email</label>
        <input
          required
          type="text"
          id="emailInput"
          defaultValue={savedData ? savedData.email : ""}
          onChange={e => _handleEmailChange(e)}
        />
        {emailErr ? <div style={{ color: "red" }}>{emailErr}</div> : ""}

        <label htmlFor="phoneInput">Phone</label>
        <input
          required
          type="text"
          id="phoneInput"
          defaultValue={savedData ? savedData.phone : ""}
          onChange={e => _handlePhoneChange(e)}
        />
        {phoneErr ? <div style={{ color: "red" }}>{phoneErr}</div> : ""}

        <label htmlFor="streetAddressInput">Street Address</label>
        <input
          required
          type="text"
          id="streetAddressInput"
          defaultValue={savedData ? savedData.street_address : ""}
          onChange={e => setStreet_Address(e.target.value)}
        />

        <label htmlFor="cityInput">City</label>
        <input
          required
          type="text"
          id="cityInput"
          defaultValue={savedData ? savedData.city : ""}
          onChange={e => setCity(e.target.value)}
        />

        <label htmlFor="stateInput">State</label>
        <select
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

        <label htmlFor="zipcodeInput">Zipcode</label>
        <input
          required
          type="text"
          id="zipcodeInput"
          defaultValue={savedData ? savedData.zipcode : ""}
          onChange={e => _handleZipcodeChange(e)}
        />
        {zipcodeErr ? <div style={{ color: "red" }}>{zipcodeErr}</div> : ""}

        {!emailErr && !phoneErr && !stateErr && !zipcodeErr ? (
          <input type="submit" value="Place Order" />
        ) : (
          <input type="submit" value="Place Order" disabled />
        )}
        <p>Step 2 of 2</p>
      </form>
    </div>
  );
}
