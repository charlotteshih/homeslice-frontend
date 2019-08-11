import React from 'react'

export default function RestaurantCard({ details, deleteRestaurant }) {
  console.dir(details);

  return (
    <div>
      <h2>{details.name}</h2>
      <p>Address: {details.street_address}</p>
      <p>Phone: {details.phone}</p>
      <button onClick={() => deleteRestaurant(details.id)}>Delete User</button>
    </div>
  )
}
