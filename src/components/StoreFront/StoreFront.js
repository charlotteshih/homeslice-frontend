import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Config from '../../config';
import GlobalContext from '../../contexts/GlobalContext';

export default function StoreFront({ match }) {
  const context = useContext(GlobalContext)
  const [restaurant, setRestaurant] = useState({
    id: 0,
    name: '',
    email: '',
    password: '',
    phone: '',
    street_address: '',
    city: '',
    state: '',
    zipcode: ''
  });

  function fetchRestaurants() {
    fetch(`${Config.apiBaseUrl}/restaurants/${match.params.restaurantId}`)
      .then(res => {
        if(res.status === 200) {
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then(resJson => {
        setRestaurant({...resJson});
        context.setRestaurantData({...resJson});
      })
      .catch(err => console.error(err));
  }

  useEffect(() => fetchRestaurants(), []);

  return (
    <div>
      <section className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <span>
          {restaurant.street_address}<br />
          {restaurant.city}, {restaurant.state} {restaurant.zipcode}<br />
          {restaurant.phone}<br />
          {restaurant.email}
        </span>
      </section>
      <Link to={`/restaurant/${restaurant.id}/order-online`}>Place An Order!</Link>
    </div>
  )
}
