import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function StoreFront({ match }) {
  const { restaurantData, setRestaurantData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);
  //const [localRestaurantData, setLocalRestaurantData] = useState(context.restaurantData);

  useEffect(() => {
    FetchServices._getRestaurantById(match.params.restaurantId)
      .then(res => {
        console.log('storefron-res', res);
        if(res.status === 200) {
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then(resJson => {
        console.log('resJson', resJson)
        return setRestaurantData({...resJson});
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if(isLoading) {
    return (
      <div className="padding-top-60px">
        <h1>Loading...</h1>
      </div>
    );
  }
  else {
    return (
      <div className="StoreFront__container padding-top-60px">
        <section className="StoreFront__restaurant-info">
          <h3>{restaurantData.name}</h3>
          <div>{restaurantData.street_address}</div>
          <div>{`${restaurantData.city}, ${restaurantData.state} ${restaurantData.zipcode}`}</div>
          <div>{restaurantData.phone}</div>
          <div>{restaurantData.email}</div>
        </section>
        <button className="StoreFront__order-button btn">
          <Link
            className="link" 
            to={`/restaurant/${restaurantData.id}/order-online`}>Order Online</Link>
        </button>
      </div>
    )
  }
}
