import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import FetchServices from '../../services/FetchServices';

export default function StoreFront({ match }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };
  const { RestaurantData, setRestaurantData } = useContext(GlobalContext);
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
      <div style={pageStyle}>
        <h1>Loading...</h1>
      </div>
    );
  }
  else {
    return (
      <div style={pageStyle}>
        <section className="restaurant-info">
          <h3>{RestaurantData.name}</h3>
          <span>
            {RestaurantData.street_address}<br />
            {RestaurantData.city}, {RestaurantData.state} {RestaurantData.zipcode}<br />
            {RestaurantData.phone}<br />
            {RestaurantData.email}
          </span>
        </section>
        <Link to={`/restaurant/${RestaurantData.id}/order-online`}>Place An Order!</Link>
      </div>
    )
  }
}
