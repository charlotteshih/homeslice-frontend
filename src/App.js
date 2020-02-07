import React, { useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Routes from "./routes/Routes";

function App() {
  
  const [restaurantData, setRestaurantData] = useState({});
  const [pizzaData, setPizzaData] = useState({});
  const [orderData, setOrderData] = useState({});
  const [customerData, setCustomerData] = useState({});
  const [userIsSignedIn, setUserIsSignedIn] = useState(false);
  const [userIsAdmin, setUserIsAdmin] = useState(false);

  const context = {
    restaurantData,
    pizzaData,
    orderData,
    customerData,
    userIsSignedIn,
    userIsAdmin,
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


