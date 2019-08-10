import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import DashBoardNav from './DashboardNav';
import SignInForm from './SignInForm';
import AdminSignIn from './AdminSignIn';

export default function Header({ history }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };
  let [signInFormsShowing, setSignInFormsShowing] = useState(false);

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
          <button onClick={() => setSignInFormsShowing(!signInFormsShowing)}>Sign In</button>
          {signInFormsShowing?
            <> 
            <SignInForm
              setSignInFormsShowing={setSignInFormsShowing} 
              history={history}/>
            <AdminSignIn 
              setSignInFormsShowing={setSignInFormsShowing}
              history={history}/>
            </>   
            : 
            ""
          }
          </>
        )}
      </nav>
    </header>
  )
}
