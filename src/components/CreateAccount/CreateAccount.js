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
  let [passwordMatch, setPasswordMatch] = useState('');
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
    let passwordsMatch = password === passwordMatch;

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
    if(!passwordsMatch) {
      setValidationErr(
        'Passwords do not match'
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
      else if(res.status === 400) {
        setValidationErr('Email already in use.');
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

        <label htmlFor="passwordMatchInput">Confirm password</label>
        <input
          onChange={(e) => setPasswordMatch(e.target.value)}  
          id="passwordMatchInput" 
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
