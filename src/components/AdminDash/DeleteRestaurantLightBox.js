import React from 'react'
import RestaurantCard from '../AdminDash/RestaurantCard';

export default function DeleteRestaurantLightBox(props) {
  let lightBoxStyle = {
    background: 'lightgrey',
    position: 'absolute',
    padding: '20px',
    zIndex: '10'
  }
  let lightBoxBg = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,0.5)',
    zIndex: '5',
  }
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
    <div style={lightBoxBg}>
      <div style={lightBoxStyle}>
        <h2>Delete This Account?</h2>
        <RestaurantCard 
          displayMode={true}
          details={restaurantToRemove} />
        <button onClick={() => setDeleteConfirmVisible(false)}>Cancel</button>
        <button onClick={() => handleDeleteConfirm()}>Yes</button>
      </div>
    </div>
  )
}
