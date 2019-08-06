import React, { useState, useEffect, useContext } from 'react';
import GlobalContext from './contexts/GlobalContext';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CreateAccount from './components/CreateAccount/createAccount';
import StoreFront from './components/StoreFront/StoreFront';
import OrderOnline from './components/OrderOnline/OrderOnline';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Payment from './components/Payment/Payment.js'
import SuperUserDash from './components/SuperUserDash/SuperUserDash';
import RestaurantDash from './components/RestaurantDash/RestaurantDash';


function App() {

  return (
    <main className='App'>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/create-account' component={CreateAccount} />
          <Route exact path='/restaurant/:restaurantId' component={StoreFront} />
          <Route exact path='/restaurant/:restaurantId/orderOnline' component={OrderOnline} />
          <Route exact path='/restaurant/:restaurantId/payment' component={Payment} />
          <Route exact path='/restaurant/:restaurantId/orderStatus/:orderId' component={OrderStatus} />
          <Route exact path='/dashboard/superuser' component={SuperUserDash} />
          <Route exact path='/dashboard/restaurant/restaurant-id' component={RestaurantDash} />
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;