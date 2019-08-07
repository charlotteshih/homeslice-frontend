import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import DashBoardNav from './DashboardNav';
import SignInForm from './SignInForm';

export default function Header() {
  let [signInFormShowing, setSignInFormShowing] = useState(false);

  let context = useContext(GlobalContext);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {context.restaurant.hasOwnProperty('id')? (
          <DashBoardNav />
        )
        :
        (
          <>
          <button onClick={() => setSignInFormShowing(!signInFormShowing)}>Sign In</button>
          {signInFormShowing? <SignInForm /> : ""}
          </>
        )}
      </nav>
    </header>
  )
}
