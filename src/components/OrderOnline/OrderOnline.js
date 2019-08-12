import React, {useState, useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function OrderOnline({ match, history }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const context = useContext(GlobalContext);
  const [pizzaSize, setPizzaSize] = useState('');
  const [pizzaType, setPizzaType] = useState('');
  const [pizzaBasePrice, setPizzaBasePrice] = useState(0);
  const [pizzaAddlPrice, setPizzaAddlPrice] = useState(0);

  const _handlePizzaSizeChange = e => {
    e.preventDefault();

    let pizzaSize = e.target.value;
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
  }

  const _handlePizzaTypeChange = e => {
    e.preventDefault();

    let pizzaType = e.target.value;
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
  }

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <span>Subtotal: <b>${pizzaBasePrice + pizzaAddlPrice}.00</b></span>

        <input type="submit" value="Next: Submit Payment &amp; Delivery Info" />
      </form>
    </div>
  )
}
