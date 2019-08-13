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
  const errorStyle = {
    color: 'red',
    border: '2px solid #f44336'
  }
  

  let [restaurantName, setRestaurantName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [phone, setPhone] = useState('');
  let [streetAddress, setStreetAddress] = useState('');
  let [city, setCity] = useState('');
  let [state, setState] = useState('');
  let [zipcode, setZipcode] = useState('');
  let [validationErr, setValidationErr] = useState('');

  let context = useContext(GlobalContext);


  const handleSubmit = (e) => {
    e.preventDefault();
    let passwordRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
    let usernameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let phoneRegex = /^\d{10}$/
    let pwIsRegexMatch = passwordRegex.test(password);
    let usernameIsRegexMatch = usernameRegex.test(email);
    let phoneIsRegexMatch = phoneRegex.test(phone);

    if(!pwIsRegexMatch) {
      setValidationErr((
        <>
        <p>Passwords must contain:</p>
        <ul>
          <li>1 uppercase letter</li>
          <li>1 lowercase letter</li>
          <li>1 number</li>
          <li>1 special character</li>
          <li>be least 8 characters long</li>
        </ul>
        </>
      ));
    }
    if(!usernameIsRegexMatch) {
      setValidationErr(
        `Please provide a valid email`
      );
    }
    if(!phoneIsRegexMatch) {
      setValidationErr(
        'Invalid Phone number, did you include the area code?'
      );
    }


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
        console.log('response', response);
        let newList = props.restaurants;
        console.log('newList', newList);
        newList.unshift({...response});
        console.log('newList2', newList);

        props.setRestaurants([...newList]);
        return;
      }
      return context.setRestaurantData({...response})
    })
    .then(updatedState => {
      if(props.setIsExpanded) {
        props.setIsExpanded(false);
        return;
      }
      props.history.push(`/restaurant/${updatedState.restaurantData.id}`)
    })
    .catch(err => console.error(err));
  }


  return (
    <div style={pageStyle}>
      <h1>Create Account</h1>
      <hr />
      {validationErr
      ? <div style={{color: 'red'}}>{validationErr}</div>
      : ''
      }
      <form onSubmit={handleSubmit} style={formStyle}>
        <label htmlFor="restaurantNameInput">Restaurant name</label>
        <input 
          onChange={(e) => setRestaurantName(e.target.value)} 
          id="restaurantNameInput" 
          type="text"
          required/>

        <label htmlFor="emailInput">Email</label>
        <input 
          onChange={(e) => setEmail(e.target.value)} 
          id="emailInput" 
          type="text"
          required/>

        <label htmlFor="passwordInput">Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}  
          id="passwordInput" 
          type="text"
          required/>

        <label htmlFor="phoneInput">Phone</label>
        <input 
          onChange={(e) => setPhone(e.target.value)} 
          id="phoneInput" 
          type="text"
          required/>

        <label htmlFor="streetAddressInput">Street Address</label>
        <input 
          onChange={(e) => setStreetAddress(e.target.value)} 
          id="streetAddressInput" 
          type="text"
          required/>

        <label htmlFor="cityInput">City</label>
        <input 
          onChange={(e) => setCity(e.target.value)} 
          id="cityInput" 
          type="text"
          required/>

        <label htmlFor="stateInput">State</label>
        <input 
          onChange={(e) => setState(e.target.value)} 
          id="stateInput" 
          type="text"
          required/>

        <label htmlFor="zipcodeInput">zipcode</label>
        <input 
          onChange={(e) => setZipcode(e.target.value)} 
          id="zipcodeInput" 
          type="text"
          required/>

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}
