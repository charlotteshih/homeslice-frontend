import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GlobalContext from '../../contexts/GlobalContext';

export default function DashboardNav() {

  let context = useContext(GlobalContext);

  const logOutUser = () => {
    localStorage.removeItem('jwt');
    context.setUserIsSignedIn(false);
  };

  let { restaurant_id } = jwt.decode(localStorage.getItem('jwt'));
  return (
    <>
      <Link to={`/restaurant/${restaurant_id}`}>View Storefront</Link>
      <Link to={`/dashboard/restaurant/${restaurant_id}`}>View Orders</Link>
      <Link to={`/restaurant/${restaurant_id}/dashboard/analytics`}>View Analytics</Link>
      <Link to={`/`} onClick={logOutUser}>Logout</Link>
    </>
  )
}
