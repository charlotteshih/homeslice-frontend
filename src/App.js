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
import SuperUserDash from './components/SuperUserDash/SuperUserDash';
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
    }
  }
  setRestaurantData = (obj, callback) => {
    this.setState({ RestaurantData: obj }, () => {
      if(!callback) {
        return;
      }
      callback(this.state);
    });
  }

  setPizzaData = (obj) => {
    this.setState({ pizzaData: obj });
  }

  setCustomerData = (obj, callback) => {
    this.setState({ customerData: obj }, () => {
      if(!callback) {
        return;
      }
      callback(this.state);
    });
  }

  setOrderData = (obj, callback) => {
    this.setState({ orderData: obj}, () => {
      if(!callback) {
        return;
      } 
      callback(this.state)
    });
  }

  setUserIsSignedIn = (bool) => {
    this.setState({ userIsSignedIn: bool });
  }

  render() {
    let context = {
      setRestaurantData: this.setRestaurantData,
      setPizzaData: this.setPizzaData,
      setCustomerData: this.setCustomerData,
      setUserIsSignedIn: this.setUserIsSignedIn,
      setOrderData: this.setOrderData,
      ...this.state
    }
    return (
      <main className='App'>
        <GlobalContext.Provider value={context}>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/create-account' component={CreateAccount} />
              <Route exact path='/restaurant/:restaurantId' component={StoreFront} />
              <Route exact path='/restaurant/:restaurantId/order-online' component={OrderOnline} />
              <Route exact path='/restaurant/:restaurantId/payment' component={Payment} />
              <Route exact path='/restaurant/:restaurantId/order-status/:orderId' component={OrderStatus} />
              <Route exact path='/dashboard/superuser' component={SuperUserDash} />
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