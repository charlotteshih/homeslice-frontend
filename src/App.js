import React, { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Routes from "./routes/Routes";

function App() {
  const [state, setState] = useState({});

  const setRestaurantData = obj => setState(state => ({ ...state, restaurantData: obj }));
  const setPizzaData = obj => setState(state => ({ ...state, pizzaData: obj }));
  const setCustomerData = obj => setState(state => ({ ...state, customerData: obj }));
  const setOrderData = obj => setState(state => ({ ...state, orderData: obj }));
  const setUserIsSignedIn = bool => setState(state => ({ ...state, userIsSignedIn: bool }));
  const setUserIsAdmin = bool => setState(state => ({ ...state, userIsAdmin: bool }));

  const context = {
    setRestaurantData,
    setPizzaData,
    setCustomerData,
    setOrderData,
    setUserIsSignedIn,
    setUserIsAdmin
  };
  
  return (
    <main>
      <GlobalContext.Provider value={context}>
        <BrowserRouter>
          <Route path="/" component={Header} />
          <Routes />
        </BrowserRouter>
      </GlobalContext.Provider>
    </main>
  );
}

export default App;


