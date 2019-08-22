import React, {useEffect, useState} from 'react'
import FetchServices from '../../services/FetchServices';
import RestaurantCard from '../AdminDash/RestaurantCard';
import AddRestaurant from '../AdminDash/AddRestaurant';
import DeleteRestaurantLightBox from './DeleteRestaurantLightBox';
import jwt from 'jsonwebtoken';

export default function AdminDash({ history }) {
  //dashboard for admin users to create and delete accounts.


  let [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  let [restaurantToRemove, setRestaurantToRemove] = useState({});

  let decoded = jwt.decode(localStorage.getItem('jwt'));
  if(!decoded || decoded.admin_id !== 1) {
    history.push('/');
  }


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
    let auth = localStorage.getItem('jwt') || 'no jwt found';
    FetchServices._adminDeleteRestaurantById(restaurantId, auth)
      .then(res => {
        if (res.status === 204) {
          setRestaurants(newList);
          return;
        }
        throw new Error({...res});
      })
  }

  return (
    <div className="AdminDash__container padding-top-60px">
    {restaurants.length === 0?
      <>
        <h1>Loading...</h1>
      </>
      :
      <>
        {deleteConfirmVisible
        ? <DeleteRestaurantLightBox 
            deleteRestaurant={deleteRestaurant} 
            restaurantToRemove={restaurantToRemove}
            setDeleteConfirmVisible={setDeleteConfirmVisible} />
        : ""}
        <AddRestaurant 
          setRestaurants={setRestaurants}
          restaurants={restaurants}
        />
        <h1 className="AdminDash__heading">Restaurants</h1>
        {restaurants.map((restaurant) => {
          return (
          <RestaurantCard 
            key={restaurant.id} 
            details={{...restaurant}} 
            deleteRestaurant={deleteRestaurant}
            setDeleteConfirmVisible={setDeleteConfirmVisible}
            setRestaurantToRemove={setRestaurantToRemove}
            />
          )
        })}
      </>
  
    }
      
    </div>
  )
}
