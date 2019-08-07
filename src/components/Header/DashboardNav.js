import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';

export default function DashboardNav() {
  let { restaurant } = useContext(GlobalContext);

  return (
    <>
      <Link to={`/restaurant/${restaurant.id}`}>View Storefront</Link>
      <Link to={`/restaurant/${restaurant.id}/dashboard`}>View Orders</Link>
      <Link to={`/restaurant/${restaurant.id}/dashboard/analytics`}>View Analytics</Link>
      <Link to={`/`}>Logout</Link>
    </>
  )
}
