import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function Payment({ match, history }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street_address, setStreet_Address] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const context = useContext(GlobalContext);

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
      zipcode,
    }

    FetchServices._submitCreateCustomer(customerData)
      .then(res => {
        if(res.status === 201) {
          return res.json();
        }
        throw new Error(res)
      })
      .then(json => {
        return context.setCustomerData({...json})
      })
      .then(updatedState => {
        const orderData = {
          restaurant_id: match.params.restaurantId,
          pizza_id: updatedState.pizzaData.id,
          customer_id: updatedState.customerData.id,
          order_status: 'Ordered'
        }
        return FetchServices._submitCreateOrder(orderData);
      })
      .then(res => {
        if(res.status === 201) {
          return res.json()
        }
        throw new Error(res);
      })
      .then(json => {
        return context.setOrderData({...json})
      })
      .then(updatedState => {
        history.push(`/restaurant/${match.params.restaurantId}/order-status/${updatedState.orderData.id}`);
      })
      .catch(err => console.error(err));
  }

  return (
    <div style={pageStyle}>
      <h1>Payment</h1>
      <form style={formStyle} onSubmit={handleSubmit}>
        <label htmlFor="firstNameInput">First Name</label>
        <input 
          required
          type="text" 
          id="firstNameInput" 
          onChange={(e) => setFirstName(e.target.value)}/>

        <label htmlFor="lastNameInput">Last Name</label>
        <input 
          required
          type="text" 
          id="lastNameInput"
          onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="emailInput">Email</label>
        <input 
          required
          type="text" 
          id="emailInput"
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="phoneInput">Phone</label>
        <input 
          required
          type="text" 
          id="phoneInput"
          onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="streetAddressInput">Street Address</label>
        <input 
          required
          type="text" 
          id="streetAddressInput"
          onChange={(e) => setStreet_Address(e.target.value)} />

        <label htmlFor="cityInput">City</label>
        <input 
          required
          type="text" 
          id="cityInput"
          onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="stateInput">State</label>
        <select 
          required
          id="stateInput"
          onChange={(e) => setState(e.target.value)}>
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

        <label htmlFor="zipcodeInput">Zipcode</label>
        <input 
          required
          type="text" 
          id="zipcodeInput"
          onChange={(e) => setZipcode(e.target.value)} />
        <input type="submit" value="Place Order" />
      </form>
    </div>
  )
}
