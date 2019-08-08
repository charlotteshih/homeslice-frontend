import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import config from '../../config';

export default function SignInForm(props) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };
  let context = useContext(GlobalContext);

  let [emailSignIn, setEmailSignIn] = useState('');
  let [passwordSignIn, setPasswordSignIn] = useState('');

  const handleSubmit = (e, emailSignIn, passwordSignIn) => {
    e.preventDefault();
    _submitLoginInformation({
      email: emailSignIn,
      password: passwordSignIn
    })
    .then(res => {
      if(res.status === 200) {
        return res.json();
      }
      throw new Error(res);
    })
    .then((json) => {
      localStorage.setItem('jwt', json.authToken)
      context.setUserIsSignedIn(true);
      props.setSignInFormShowing(false);
    })
    .catch(err => console.error(err));


    function _submitLoginInformation(dataToSubmit) {
      return fetch(`${config.apiBaseUrl}/authorization/login`, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
        headers: {
          'Content-Type': 'Application/Json'
        } 
      })
    }
  }


  return (
    <div>
      <h3>Sign In</h3>
      <form  style={formStyle} onSubmit={(e) => handleSubmit(e, emailSignIn, passwordSignIn)}>
        <label htmlFor="emailSignIn">Email</label>
        <input id="emailSignIn" onChange={(e) => setEmailSignIn(e.target.value)}/>
        <label htmlFor="passwordSignIn">Password</label>
        <input id="passwordSignIn" onChange={(e) => setPasswordSignIn(e.target.value)} />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}
