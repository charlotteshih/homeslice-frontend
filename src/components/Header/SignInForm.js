import React, { useContext, useState } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';
import jwt from 'jsonwebtoken';

export default function SignInForm(props) {
  let context = useContext(GlobalContext);

  let [emailSignIn, setEmailSignIn] = useState('');
  let [passwordSignIn, setPasswordSignIn] = useState('');
  let [validationErr, setValidationErr] = useState('');

  const handleRestaurantSubmit = (e, emailSignIn, passwordSignIn) => {
    e.preventDefault();
    let errorMessage = 'Incorrect username or password';
    let passwordRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
    let usernameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let pwIsRegexMatch = passwordRegex.test(passwordSignIn);
    let usernameIsRegexMatch = usernameRegex.test(emailSignIn)

    if(!pwIsRegexMatch || !usernameIsRegexMatch) {
      setValidationErr(errorMessage);
    }

    FetchServices._submitRestaurantLogin({
      email: emailSignIn,
      password: passwordSignIn
    })
    .then(res => {
      if(res.status === 200) {
        return res.json();
      }
      else {
        setValidationErr(errorMessage);
        throw new Error(res);
      }
    })
    .then((json) => {
      localStorage.setItem('jwt', json.authToken)
      context.setUserIsSignedIn(true);
      props.setSignInFormsShowing(false);
      let { restaurant_id } = jwt.decode(localStorage.getItem('jwt'));
      props.history.push(`/dashboard/restaurant/${restaurant_id}`);
    })
    .catch(err => console.error(err));
  }


  return (
    <div className="Header__sign-in">
      <h3 className="Header__sign-in__heading">Restaurant Sign In</h3>
      {validationErr
      ?<span>{validationErr}</span>
      :""
      }
      <form
        className="Header__form"
        onSubmit={(e) => handleRestaurantSubmit(e, emailSignIn, passwordSignIn)}>
        <label
          className="Header__sign-in__label"
          htmlFor="emailSignIn">Email</label>
        <input 
          id="emailSignIn"
          className="Header__sign-in__input"
          onChange={(e) => setEmailSignIn(e.target.value)}
          type="email"
          required/>
        <label 
          className="Header__sign-in__label"
          htmlFor="passwordSignIn">Password</label>
        <input 
          id="passwordSignIn"
          className="Header__sign-in__input"
          onChange={(e) => setPasswordSignIn(e.target.value)}
          type="password"
          required
          />
        <input 
          className="Header__sign-in__submit btn"
          type="submit" 
          value="Sign In" />
      </form>
    </div>
  )
}
