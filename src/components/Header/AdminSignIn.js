import React, { useContext, useState, useEffect } from 'react';
import GlobalContext from '../../contexts/GlobalContext';
import config from '../../config';
import FetchServices from '../../services/FetchServices';

export default function SignInForm(props) {
  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  let context = useContext(GlobalContext);

  let [emailSignIn, setEmailSignIn] = useState('');
  let [passwordSignIn, setPasswordSignIn] = useState('');

  const handleAdminSubmit = (e, emailSignIn, passwordSignIn) => {
    e.preventDefault();
    FetchServices._submitAdminLogin({
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
      context.setUserIsAdmin(true);
      props.setSignInFormsShowing(false);
      props.history.push(`/dashboard/admin`);
    })
    .catch(err => console.error(err));
  }


  return (
    <div>
      <h3>Admin Sign In</h3>
      <form  style={formStyle} onSubmit={(e) => handleAdminSubmit(e, emailSignIn, passwordSignIn)}>
        <label htmlFor="adminEmailSignIn">Email</label>
        <input id="adminEmailSignIn" onChange={(e) => setEmailSignIn(e.target.value)}/>
        <label htmlFor="adminPasswordSignIn">Password</label>
        <input id="adminPasswordSignIn" onChange={(e) => setPasswordSignIn(e.target.value)} />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}
