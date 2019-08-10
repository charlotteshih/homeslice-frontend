import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GlobalContext from '../../contexts/GlobalContext';

export default function DashboardNav() {

  let context = useContext(GlobalContext);

  const logOutUser = () => {
    localStorage.removeItem('jwt');
    context.setUserIsAdmin(false);
    context.setUserIsSignedIn(false);
  };

  let { restaurant_id } = jwt.decode(localStorage.getItem('jwt'));
  return (
    <ul>
      {context.userIsAdmin?
      <>
        <li><NavLink to='/dashboard/admin/' >Admin Dashboard</NavLink></li>
        <li><NavLink to={`/`} onClick={logOutUser}>Logout</NavLink></li>
      </>
      :
      <>
        <li><NavLink to={`/restaurant/${restaurant_id}`}>View Storefront</NavLink></li>
        <li><NavLink to={`/dashboard/restaurant/${restaurant_id}`}>View Orders</NavLink></li>
        <li><NavLink to={`/restaurant/${restaurant_id}/dashboard/analytics`}>View Analytics</NavLink></li>
        <li><NavLink to={`/`} onClick={logOutUser}>Logout</NavLink></li>
      </>
    }
    </ul>
  )
}
