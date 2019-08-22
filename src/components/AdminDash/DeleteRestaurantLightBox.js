import React from 'react'
import RestaurantCard from '../AdminDash/RestaurantCard';

export default function DeleteRestaurantLightBox(props) {
  //confirms if user wants to delete an account.
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
        <div className="DelRest__btn-group">
          <button 
            className="DelRest__btn btn"
            onClick={() => setDeleteConfirmVisible(false)}>Keep</button>
          <button 
            className="DelRest__btn-cancel btn"
            onClick={() => handleDeleteConfirm()}>Delete</button>
        </div>
      </div>
    </div>
  )
}
