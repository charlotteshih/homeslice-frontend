import React, {useState, useEffect, useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import Config from '../../config';

export default function CreateAccount({ history }) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  }

  let [restaurantName, setRestaurantName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [phone, setPhone] = useState('');
  let [streetAddress, setStreetAddress] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipcode, setZipcode] = useState('');

  let context = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    _submitCreateAccount({
      name: restaurantName,
      email,
      password,
      phone,
      street_address: streetAddress,
      city,
      state,
      zipcode
    })
    .then(res => {
      if(res.status === 201) {
        return res.json()
      }
      throw new Error(res);
    })
    .then(response => {
      context.setRestaurantData({...response});
      history.push(`/restaurant/${context.restaurant.id}`)
    })
    .catch(err => console.error(err));

    function _submitCreateAccount(formData) {
      return fetch(`${Config.apiBaseUrl}/restaurants`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  }


  return (
    <div style={pageStyle}>
      <h1>Create Account</h1>
      <hr />
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="restaurantNameInput">Restaurant name</label>
        <input 
          onChange={(e) => setRestaurantName(e.target.value)} 
          id="restaurantNameInput" 
          type="text"/>

        <label htmlFor="emailInput">Email</label>
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          id="emailInput" 
          type="text"/>

        <label htmlFor="passwordInput">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}  
          id="passwordInput" 
          type="text"/>

        <label htmlFor="phoneInput">Phone</label>
        <input 
          onChange={(e) => setPhone(e.target.value)} 
          id="phoneInput" 
          type="text"/>

        <label htmlFor="streetAddressInput">Street Address</label>
        <input 
          onChange={(e) => setStreetAddress(e.target.value)} 
          id="streetAddressInput" 
          type="text"/>

        <label htmlFor="cityInput">City</label>
        <input 
          onChange={(e) => setCity(e.target.value)} 
          id="cityInput" 
          type="text"/>

        <label htmlFor="stateInput">State</label>
        <input 
          onChange={(e) => setState(e.target.value)} 
          id="stateInput" 
          type="text"/>

        <label htmlFor="zipcodeInput">zipcode</label>
        <input 
          onChange={(e) => setZipcode(e.target.value)} 
          id="zipcodeInput" 
          ype="text"/>

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}