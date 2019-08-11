import React, {useEffect, useState} from 'react'
import FetchServices from '../../services/FetchServices';
import RestaurantCard from '../AdminDash/RestaurantCard';
import RestaurantAnalytics from '../RestaurantAnalytics/RestaurantAnalytics';
import AddRestaurant from '../AdminDash/AddRestaurant';

export default function AdminDash() {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  //name: admin
  //pw: Admin123!
  let [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    FetchServices._getAllRestaurants()
      .then(res => {
        if(res.status === 200) {
          return res.json();
        }
        throw new Error({...res});
      })
      .then(restaurantJson => {
          setRestaurants(restaurantJson);
        })
      .catch(err => console.error(err));
  }, []);

  function deleteRestaurant(restaurantId) {
    let newList = restaurants.filter(restaurant => {
      if(restaurant.id === restaurantId) {
        return false;
      }
      return true;
    })
    FetchServices._deleteRestaurantById(restaurantId)
      .then(res => {
        if (res.status === 204) {
          setRestaurants(newList);
          return;
        }
        throw new Error({...res});
      })
    
    
  }

  return (
    <div style={pageStyle}>
    {restaurants.length === 0?
      <>
        <h1>Loading...</h1>
      </>
      :
      <>
        <AddRestaurant 
          setRestaurants={setRestaurants}
          restaurants={restaurants}
        />
        <h1>Restaurants</h1>
        {restaurants.map((restaurant) => {
          console.log('rest', restaurant);
          return (
          <RestaurantCard 
            key={restaurant.id} 
            details={{...restaurant}} 
            deleteRestaurant={deleteRestaurant}
            />
          )
        })}
      </>
  
    }
      
    </div>
  )
}
