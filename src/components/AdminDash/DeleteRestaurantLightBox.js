import React from 'react'
import RestaurantCard from '../AdminDash/RestaurantCard';

export default function DeleteRestaurantLightBox(props) {
  
  let {
    deleteRestaurant,
    restaurantToRemove,
    setDeleteConfirmVisible
  } = props

  function handleDeleteConfirm() {
    deleteRestaurant(restaurantToRemove.id);
    setDeleteConfirmVisible(false);
  }

  return (
    <div className="DelRest__overlay">
      <div className="DelRest__container">
        <h2 className="text-center">Delete This Account?</h2>
        <RestaurantCard 
          displayMode={true}
          details={restaurantToRemove} />
        <button 
          className="DelRest__btn btn"
          onClick={() => setDeleteConfirmVisible(false)}>Cancel</button>
        <button 
          className="DelRest__btn btn"
          onClick={() => handleDeleteConfirm()}>Yes</button>
      </div>
    </div>
  )
}
