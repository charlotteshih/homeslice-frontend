import React, { useContext } from 'react'
import GlobalContext from '../../contexts/GlobalContext';
import config from '../../config';
import FetchServices from '../../services/FetchServices';

export default function OrderStatus() {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  const context = useContext(GlobalContext);

  console.log(context);

  const restaurantLocation = 
    context.RestaurantData.street_address + ", " +
    context.RestaurantData.city + ", " +
    context.RestaurantData.state;

  function checkOrderStatus(orderId) {
    FetchServices._getOrderById(orderId)
      .then(res => res.json())
      .then(resJson => {
        context.setOrderData({...resJson})
      });
  }


  return (
    <div style={pageStyle}>
      <h1>Order Summary</h1>
      <p>Order Status: {context.orderData.order_status}</p>
      <p>Order Total: {context.orderData.order_total}</p>
      <p>Pickup Location: {restaurantLocation}</p>
      <p><b>Please keep this tab open so that you can view your order status in real time!</b></p>
      <button onClick={() => checkOrderStatus(context.orderData.id)}>Refresh</button>
    </div>
  )
}
