import React, { useContext, useState, useEffect } from 'react'
import GlobalContext from '../../contexts/GlobalContext';
import config from '../../config';

export default function SignInForm() {
  let context = useContext(GlobalContext);

  let [emailSignIn, setEmailSignIn] = useState('');
  let [passwordSignIn, setPasswordSignIn] = useState('');

  const handleSubmit = (e, emailSignIn, passwordSignIn) => {
    e.preventDefault();
    _submitLoginInformation({
      email: emailSignIn,
      password: passwordSignIn
    })
    .then(res => res.json())
    .then((json) => {
      console.log(json);
    })


    function _submitLoginInformation(dataToSubmit) {
      return fetch(`${config.apiBaseUrl}/authorization/login`, {
        method: 'POST',
        body: JSON.stringify(dataToSubmit),
        headers: {
          'Content-Type': 'application/json'
        } 
      })
    }
  }


  return (
    <div>
      <h3>Sign In</h3>
      <form onSubmit={(e) => handleSubmit(e, emailSignIn, passwordSignIn)}>
        <label for="emailSignIn">Email</label>
        <input id="emailSignIn" onChange={(e) => setEmailSignIn(e.target.value)}/>
        <label for="passwordSignIn">Password</label>
        <input id="passwordSignIn" onChange={(e) => setPasswordSignIn(e.target.value)} />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}
