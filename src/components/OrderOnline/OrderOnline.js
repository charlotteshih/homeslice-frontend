import React, {useState, useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Config from '../../config';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    _submitCreatePizza({
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
      .then(res => {
        context.setPizzaData({...res});
        history.push(`/restaurant/${match.params.restaurantId}/payment`)
      })
      .catch(err => console.error(err));

    function _submitCreatePizza(formData) {
      return fetch(`${Config.apiBaseUrl}/pizzas`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'Application/json'
        }
      });
    }
  }

  return (
    <div style={pageStyle}>
      <h3>Place an Order!</h3>
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="pizzaSize">Size</label>
        <select id="pizzaSize" onChange={e => setPizzaSize(e.target.value)}>
          <option value="">Please select a size...</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="X-Large">X-Large</option>
        </select>

        <label htmlFor="pizzaType">Type</label>
        <select id="pizzaType" onChange={e => setPizzaType(e.target.value)}>
          <option value="">Please select a type...</option>
          <option value="Cheese">Cheese</option>
          <option value="Pepperoni">Pepperoni</option>
          <option value="Supreme">Supreme</option>
          <option value="Veggie">Veggie</option>
          <option value="Hawaiian">Hawaiian</option>
          <option value="BBQ Chicken">BBQ Chicken</option>
        </select>

        <input type="submit" value="Next: Submit Payment &amp; Delivery Info" />
      </form>
    </div>
  )
}