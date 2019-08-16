import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import config from '../../config';
import FetchServices from '../../services/FetchServices';

export default function SignInForm(props) {

  let context = useContext(GlobalContext);

  let [emailSignIn, setEmailSignIn] = useState('');
  let [passwordSignIn, setPasswordSignIn] = useState('');
  let [validationErr, setValidationErr] = useState('');

  const handleAdminSubmit = (e, emailSignIn, passwordSignIn) => {
    e.preventDefault();
    let errorMessage = 'Incorrect username or password';
    let passwordRegex = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
    //let usernameRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let pwIsRegexMatch = passwordRegex.test(passwordSignIn);
    //let usernameIsRegexMatch = usernameRegex.test(emailSignIn)

    if(!pwIsRegexMatch) {
      setValidationErr(errorMessage);
    }

    FetchServices._submitAdminLogin({
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
      context.setUserIsAdmin(true);
      props.setSignInFormsShowing(false);
      props.history.push(`/dashboard/admin`);
    })
    .catch(err => console.error(err));
  }


  return (
    <div className="Header__sign-in">
      <h3 className="Header__sign-in__heading Header--top-border">Admin Sign In</h3>
      {validationErr
      ?<div style={{color: 'red'}}>{validationErr}</div>
      :""
      }
      <form 
        className="Header__form"
        onSubmit={(e) => handleAdminSubmit(e, emailSignIn, passwordSignIn)}>
        <label 
          className="Header__sign-in__label"
          htmlFor="adminEmailSignIn">Admin Username</label>
        <input
          className="Header__sign-in__input"
          id="adminEmailSignIn" 
          onChange={(e) => setEmailSignIn(e.target.value)}
          required
        />
        <label 
          className="Header__sign-in__label"
          htmlFor="adminPasswordSignIn">Password</label>
        <input
          className="Header__sign-in__input"
          id="adminPasswordSignIn" 
          onChange={(e) => setPasswordSignIn(e.target.value)}
          type="password"
          required />
        <input 
          className="Header__sign-in__submit btn margin-bottom-10px"
          type="submit" 
          value="Admin Sign In" />
      </form>
    </div>
  )
}
