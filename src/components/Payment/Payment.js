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
        //set customer id in global state
        return context.setCustomerData({...json})
      })
      .then(updatedState => {
        const orderData = {
          restaurant_id: match.params.restaurantId,
          pizza_id: updatedState.pizzaData.id,
          customer_id: updatedState.customerData.id,
          order_status: 'Ordered',
          // order_total: Number(updatedState.pizzaData.price)
        }

        console.log('orderData',orderData);
        return FetchServices._submitCreateOrder(orderData);
      })
      .then(res => {
        if(res.status === 201) {
          return res.json()
        }
        throw new Error(res);
      })
      .then(json => {
        console.log('json', json);
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
          type="text" 
          id="firstNameInput" 
          onChange={(e) => setFirstName(e.target.value)}/>

        <label htmlFor="lastNameInput">Last Name</label>
        <input 
          type="text" 
          id="lastNameInput"
          onChange={(e) => setLastName(e.target.value)} />

        <label htmlFor="emailInput">Email</label>
        <input 
          type="text" 
          id="emailInput"
          onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="phoneInput">Phone</label>
        <input 
          type="text" 
          id="phoneInput"
          onChange={(e) => setPhone(e.target.value)} />

        <label htmlFor="streetAddressInput">Street Address</label>
        <input 
          type="text" 
          id="streetAddressInput"
          onChange={(e) => setStreet_Address(e.target.value)} />

        <label htmlFor="cityInput">City</label>
        <input 
          type="text" 
          id="cityInput"
          onChange={(e) => setCity(e.target.value)} />

        <label htmlFor="stateInput">State</label>
        <input 
          type="text" 
          id="stateInput"
          onChange={(e) => setState(e.target.value)} />

        <label htmlFor="zipcodeInput">Zipcode</label>
        <input 
          type="text" 
          id="zipcodeInput"
          onChange={(e) => setZipcode(e.target.value)} />
        <input type="submit" value="Place Order" />
      </form>
    </div>
  )
}
