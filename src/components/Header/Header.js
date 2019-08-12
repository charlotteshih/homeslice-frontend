import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import DashBoardNav from './DashboardNav';
import SignInForm from './SignInForm';
import AdminSignIn from './AdminSignIn';
import jwt from 'jsonwebtoken';
import FetchServices from '../../services/FetchServices';

export default function Header({ history }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };
  let [signInFormsShowing, setSignInFormsShowing] = useState(false);
  let context = useContext(GlobalContext);


  const token = localStorage.getItem('jwt');
  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if(localStorage.getItem('jwt')) {
      context.setUserIsSignedIn(true);
      let decoded = jwt.decode(token);
      console.log('decodedInHeader', decoded);
      let userId = 0;
      decoded.sub === 'Admin'
        ? userId = decoded.admin_id 
        : userId = decoded.restaurant_id

      FetchServices._getRestaurantById(userId)
        .then(res => {
          console.log(res);
          if(res.ok) {
            return res.json();
          }
          throw new Error({...res});
        })
        .then(json => {
          return context.setRestaurantData({...json})
        })
        .then(() => {
          if(decoded.sub === 'Admin') {
            context.setUserIsAdmin(true);
          }
        })

      console.dir(decoded);


    }
  }, []);



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
