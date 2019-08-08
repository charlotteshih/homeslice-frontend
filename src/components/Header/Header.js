import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import DashBoardNav from './DashboardNav';
import SignInForm from './SignInForm';

export default function Header() {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };
  let [signInFormShowing, setSignInFormShowing] = useState(false);

  let context = useContext(GlobalContext);

  return (
    <header style={pageStyle}>
      <nav>
        <Link to="/">Home</Link>
        {context.userIsSignedIn? (
          <DashBoardNav />
        )
        :
        (
          <>
          <button onClick={() => setSignInFormShowing(!signInFormShowing)}>Sign In</button>
          {signInFormShowing? 
            <SignInForm setSignInFormShowing={setSignInFormShowing}/> 
            : 
            ""
          }
          </>
        )}
      </nav>
    </header>
  )
}
