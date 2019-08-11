import React, {useState, useEffect, useContext} from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function CreateAccount(props) {
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
    FetchServices._submitCreateAccount({
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
      if(context.userIsAdmin) {
        let newList = props.restaurants;

        newList.

        props.setRestaurants()
        return;
      }
      return context.setRestaurantData({...response})
    })
    .then(updatedState => {
      if(context.userIsAdmin) {
        return;
      }
      props.history.push(`/restaurant/${updatedState.RestaurantData.id}`)
    })
    .catch(err => console.error(err));
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
