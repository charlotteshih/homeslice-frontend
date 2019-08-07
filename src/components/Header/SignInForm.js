import React, { useContext } from 'react'
import GlobalContext from '../../contexts/GlobalContext';

export default function SignInForm() {
  return (
    <div>
      <h3>Sign In</h3>
      <form>
        <label for="emailSignIn">Email</label>
        <input id="emailSignIn" />
        <label for="passwordSignIn">Password</label>
        <input id="passwordSignIn" />
        <input type="submit" value="Sign In" />
      </form>
    </div>
  )
}
