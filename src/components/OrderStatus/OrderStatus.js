import React, { useContext } from 'react'
import GlobalContext from '../../contexts/GlobalContext';

export default function OrderStatus() {

  const context = useContext(GlobalContext);

  console.log(context);

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
      <p><b>Please keep this tab open so that you can view your order status in real time!</b></p>
    </div>
  )
}
