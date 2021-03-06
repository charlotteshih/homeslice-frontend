import React, { useState, useContext } from "react";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";

export default function OrderOnline({ match, history }) {
  const context = useContext(GlobalContext);
  const [pizzaSize, setPizzaSize] = useState("");
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaBasePrice, setPizzaBasePrice] = useState(0);
  const [pizzaAddlPrice, setPizzaAddlPrice] = useState(0);
  let [sizeErr, setSizeErr] = useState("");
  let [typeErr, setTypeErr] = useState("");

  const _handlePizzaSizeChange = e => {
    e.preventDefault();

    let pizzaSize = e.target.value;
    if (!pizzaSize) {
      setSizeErr("Please select a pizza size.");
    } else {
      setSizeErr("");
    }
    let basePrice = 0;
    // determine base price based on size of pizza
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
    //update pizza size and price in state
    setPizzaSize(pizzaSize);
    setPizzaBasePrice(basePrice);
  };

  const _handlePizzaTypeChange = e => {
    e.preventDefault();

    let pizzaType = e.target.value;
    if (!pizzaType) {
      setTypeErr("Please select a type of pizza.");
    } else {
      setTypeErr("");
    }
    let addlPrice = 0;
    // determine additional price based on toppings
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
    //update pizza type and price in state
    setPizzaType(pizzaType);
    setPizzaAddlPrice(addlPrice);
  };

  const handleSubmit = e => {
    e.preventDefault();
    // POST order to backend
    FetchServices._submitCreatePizza({
      size: pizzaSize,
      type: pizzaType
    })
      .then(res => {
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then(json => {
        // set pizza data in context so that we can use it in Payment.js
        return context.setPizzaData({ ...json });
      })
      .then(() => {
        // navigate to the appropriate restaurant's payment page
        history.push(`/restaurant/${match.params.restaurantId}/payment`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="OrderOnline__container padding-top-60px">
      <h1 className="OrderOnline__heading">Place an Order!</h1>
      <div className="OrderOnline__image">
        {/* if the ordered pizza information is available, then display the correct pizza image, (which is 'required' based on the pizza type) Otherwise, display a blank pizza image. */}
        {pizzaType.length ? (
          <img
            className="OrderOnline__pizza-img"
            src={require(`../../images/${pizzaType
              .toLowerCase()
              .replace(/\s+/g, "-")}.png`)}
            alt={`${pizzaType} pizza`}
          />
        ) : (
          <img
            className="OrderOnline__pizza-img"
            src={require(`../../images/base.png`)}
            alt={`${pizzaType} pizza`}
          />
        )}
        {sizeErr ? <div style={{ color: "red" }}>{sizeErr}</div> : ""}
        {typeErr ? <div style={{ color: "red" }}>{typeErr}</div> : ""}
      </div>
      <form className="OrderOnline__form" onSubmit={handleSubmit}>
        <label className="OrderOnline__form__label" htmlFor="pizzaSize">
          Pizza Size
        </label>
        <select
          className="OrderOnline__form__select"
          id="pizzaSize"
          onChange={e => _handlePizzaSizeChange(e)}
        >
          <option value="">Please select a size...</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="X-Large">X-Large</option>
        </select>

        <label className="OrderOnline__form__label" htmlFor="pizzaType">
          Pizza Type
        </label>
        <select
          className="OrderOnline__form__select"
          id="pizzaType"
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

        <div className="OrderOnline__subtotal">
          Subtotal: <b>${pizzaBasePrice + pizzaAddlPrice}.00</b>
        </div>

        {pizzaSize && pizzaType ? (
          <input className="btn" type="submit" value="Continue" />
        ) : (
          <input
            className="btn disabled"
            type="submit"
            value="Continue"
            disabled
          />
        )}
      </form>
    </div>
  );
}
