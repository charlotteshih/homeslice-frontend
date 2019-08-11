import React, {useState, useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function OrderOnline({ match, history }) {
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
  const [pizzaSize, setPizzaSize] = useState("");
  const [pizzaType, setPizzaType] = useState("");
  const [pizzaBasePrice, setPizzaBasePrice] = useState(0);
  const [pizzaAddlPrice, setPizzaAddlPrice] = useState(0);

  const _handlePizzaSizeChange = e => {
    const selectedSize = e.target.value;
    let selectedPrice = 0;

    setPizzaSize(selectedSize);

    switch (selectedSize) {
      case "Small":
        selectedPrice = 9;
        break;
      case "Medium":
        selectedPrice = 10;
        break;
      case "Large":
        selectedPrice = 11;
        break;
      case "X-Large":
        selectedPrice = 12;
        break;
      default:
        selectedPrice = 0;
    }

    setPizzaBasePrice(selectedPrice);
  };

  const _handlePizzaTypeChange = e => {
    const selectedType = e.target.value;
    let selectedPrice = 0;

    setPizzaType(selectedType);

    switch (selectedType) {
      case "Cheese":
        selectedPrice = 0;
        break;
      case "Pepperoni":
        selectedPrice = 2;
        break;
      case "Supreme":
        selectedPrice = 3;
        break;
      case "Veggie":
        selectedPrice = 1;
        break;
      case "Hawaiian":
        selectedPrice = 2;
        break;
      case "BBQ Chicken":
        selectedPrice = 2;
        break;
      default:
        selectedPrice = 0;
    }

    setPizzaAddlPrice(selectedPrice);
  };

  const handleSubmit = e => {
    e.preventDefault();
    FetchServices._submitCreatePizza({
      size: pizzaSize,
      type: pizzaType
      // base_price: pizzaBasePrice,
      // addl_price: pizzaAddlPrice
    })
    .then(res => {
      // console.log(res);
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error(res);
      }
    })
    .then(json => {
      return context.setPizzaData({...json});
    })
    .then(() => {
      history.push(`/restaurant/${match.params.restaurantId}/payment`)
    })
    .catch(err => console.error(err));
  }

  return (
    <div style={pageStyle}>
      <h3>Place an Order!</h3>
      {pizzaType.length > 0 && (
        <img
          style={imageStyle}
          src={require(`../../images/${pizzaType
            .toLowerCase()
            .replace(/\s/g, "-")}.png`)}
          alt={`${pizzaType} pizza`}
        />
      )}
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="pizzaSize">Size</label>
        <select id="pizzaSize" onChange={e => _handlePizzaSizeChange(e)}>
          <option value="">Please select a size...</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="X-Large">X-Large</option>
        </select>

        <label htmlFor="pizzaType">Type</label>
        <select id="pizzaType" onChange={e => _handlePizzaTypeChange(e)}>
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

        <input type="submit" value="Next: Submit Payment &amp; Delivery Info" />
      </form>
    </div>
  );
}
