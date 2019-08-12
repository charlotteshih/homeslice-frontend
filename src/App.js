import React from 'react';
import GlobalContext from './contexts/GlobalContext';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import CreateAccount from './components/CreateAccount/CreateAccount';
import StoreFront from './components/StoreFront/StoreFront';
import OrderOnline from './components/OrderOnline/OrderOnline';
import OrderStatus from './components/OrderStatus/OrderStatus';
import Payment from './components/Payment/Payment.js'
import AdminDash from './components/AdminDash/AdminDash';
import RestaurantDash from './components/RestaurantDash/RestaurantDash';
import RestaurantAnalytics from './components/RestaurantAnalytics/RestaurantAnalytics';
import NotFound from './components/NotFound/NotFound';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      restaurantData: {},
      pizzaData: {},
      customerData: {},
      orderData: {},
      userIsSignedIn: false,
      userIsAdmin: false,
    }
  }
  setRestaurantData = (obj) => {
    return new Promise(resolve => {
      this.setState({ restaurantData: obj }, () => resolve(this.state));
    });
  }

  setPizzaData = (obj) => {
    return new Promise(resolve => {
      this.setState({ pizzaData: obj }, () => resolve(this.state));
    });
  }

  setCustomerData = (obj) => {
    return new Promise(resolve => {
      this.setState({ customerData: obj }, () => resolve(this.state));
    });
  }

  setOrderData = (obj) => {
    return new Promise(resolve => {
      this.setState({ orderData: obj}, () => resolve(this.state));
    });
  }

  setUserIsSignedIn = (bool) => {
    return new Promise(resolve => {
      this.setState({ userIsSignedIn: bool }, resolve);
    });
  }

  setUserIsAdmin = (bool) => {
    return new Promise(resolve => {
      this.setState({ userIsAdmin: bool }, resolve);
    });
  }

  render() {
    let context = {
      setRestaurantData: this.setRestaurantData,
      setPizzaData: this.setPizzaData,
      setCustomerData: this.setCustomerData,
      setUserIsSignedIn: this.setUserIsSignedIn, 
      setUserIsAdmin: this.setUserIsAdmin,
      setOrderData: this.setOrderData,
      ...this.state
    }
    return (
      <main className='App'>
        <GlobalContext.Provider value={context}>
          <BrowserRouter>
            <Route path='/' component={Header}/>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/create-account' component={CreateAccount} />
              <Route exact path='/restaurant/:restaurantId' component={StoreFront} />
              <Route exact path='/restaurant/:restaurantId/order-online' component={OrderOnline} />
              <Route exact path='/restaurant/:restaurantId/payment' component={Payment} />
              <Route exact path='/restaurant/:restaurantId/order-status/:orderId' component={OrderStatus} />
              <Route exact path='/dashboard/admin' component={AdminDash} />
              <Route exact path='/dashboard/restaurant/:restaurantId' component={RestaurantDash} />
              <Route exact path='/dashboard/restaurant/:restaurantId/analytics' component={RestaurantAnalytics} />
              <Route component={NotFound} />
            </Switch>
          </BrowserRouter>
        </GlobalContext.Provider>
      </main>
    );
  }
}

export default App;