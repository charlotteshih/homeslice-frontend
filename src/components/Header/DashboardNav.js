import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import GlobalContext from '../../contexts/GlobalContext';

export default function DashboardNav(props) {
  //navigation for logged in restaurant owners.
  let context = useContext(GlobalContext);
  
  const logOutUser = () => {
    context.setUserIsAdmin(false)
      .then(() => {
        return context.setUserIsSignedIn(false);
      })
      .then(() => {
        props.setSignInFormsShowing(false);
        localStorage.removeItem('jwt');
      })
  };
  

  let {restaurant_id} = jwt.decode(localStorage.getItem('jwt'));
  return (
    <ul className="DashboardNav__container">
      {context.userIsAdmin?
      <>
        <li className="DashboardNav__item">
          <NavLink 
            className="DashboardNav__link"
            onClick={() => props.setSignInFormsShowing(false)} 
            to='/dashboard/admin/' >Admin Dashboard</NavLink>
        </li>
        <li 
          className="DashboardNav__item"
          onClick={() => logOutUser()}>
          <NavLink 
            className="DashboardNav__link"
            to={`/`} >Logout</NavLink>
        </li>
      </>
      :
      <>
        <li className="DashboardNav__item">
          <NavLink 
            className="DashboardNav__link"
            onClick={() => props.setSignInFormsShowing(false)} 
            to={`/restaurant/${restaurant_id}`}>View Storefront</NavLink>
        </li>
        <li className="DashboardNav__item">
          <NavLink 
            className="DashboardNav__link"
            onClick={() => props.setSignInFormsShowing(false)}
            to={`/dashboard/restaurant/${restaurant_id}`}>View Orders</NavLink>
        </li>
        <li 
          className="DashboardNav__item"
          onClick={() => logOutUser()}>
          <NavLink 
            className="DashboardNav__link" 
            to={`/`}>Logout</NavLink>
        </li>
      </>
    }
    </ul>
  )
}


  

