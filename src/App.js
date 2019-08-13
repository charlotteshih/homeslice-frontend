import React from 'react';
import GlobalContext from './contexts/GlobalContext';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import styled from 'styled-components';
import Routes from './routes/Routes';


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
            <Routes />
          </BrowserRouter>
        </GlobalContext.Provider>
      </main>
    );
  }
}

export default App;