import React, { useContext } from 'react'
import GlobalContext from '../../contexts/GlobalContext';

export default function OrderStatus() {

  const context = useContext(GlobalContext);

  const restaurantLocation = 
    context.RestaurantData.street_address + ", " +
    context.RestaurantData.city + ", " +
    context.RestaurantData.state;


  return (
    <div>
      <h1>Order Summary</h1>
      <p>Order Status: {context.orderData.order_status}</p>
      <p>Order Total: {context.orderData.order_total}</p>
      <p>Pickup Location: {restaurantLocation}</p>
    </div>
  )
}
