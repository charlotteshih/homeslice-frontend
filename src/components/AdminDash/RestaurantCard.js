import React from 'react'

export default function RestaurantCard(props) {
  let { 
    details, 
    setRestaurantToRemove, 
    setDeleteConfirmVisible 
  } = props;
  console.dir(details);

  function handleDeleteButtonClick() {
    setRestaurantToRemove(props.details);
    setDeleteConfirmVisible(true);
  }


  return (
    <div>
      <h2>{details.name}</h2>
      <p>Address: {details.street_address}</p>
      <p>Phone: {details.phone}</p>
      {props.displayMode
      ?""
      :<button onClick={() => handleDeleteButtonClick()}>Delete User</button>
      }
    </div>
  )
}