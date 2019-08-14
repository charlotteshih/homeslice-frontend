import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import styled from "styled-components";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Home from "../components/Home/Home";
import CreateAccount from "../components/CreateAccount/CreateAccount";
import StoreFront from "../components/StoreFront/StoreFront";
import OrderOnline from "../components/OrderOnline/OrderOnline";
import OrderStatus from "../components/OrderStatus/OrderStatus";
import Payment from "../components/Payment/Payment.js";
import AdminDash from "../components/AdminDash/AdminDash";
import RestaurantDash from "../components/RestaurantDash/RestaurantDash";
import RestaurantAnalytics from "../components/RestaurantAnalytics/RestaurantAnalytics";
import NotFound from "../components/NotFound/NotFound";

import "./style.css";

function Routes({ location }) {
  // console.log('location', location.key);
  return (
    <TransitionGroup className="transition-group">
      <CSSTransition
        key={location.key}
        timeout={{ enter: 300, exit: 300 }}
        classNames="fade"
      >
        <section className="route-section">
          <Switch location={location}>
            <Route exact path="/" component={Home} />
            <Route exact path="/create-account" component={CreateAccount} />
            <Route
              exact
              path="/restaurant/:restaurantId"
              component={StoreFront}
            />
            <Route
              exact
              path="/restaurant/:restaurantId/order-online"
              component={OrderOnline}
            />
            <Route
              exact
              path="/restaurant/:restaurantId/payment"
              component={Payment}
            />
            <Route
              exact
              path="/restaurant/:restaurantId/order-status/:orderId"
              component={OrderStatus}
            />
            <Route exact path="/dashboard/admin" component={AdminDash} />
            <Route
              exact
              path="/dashboard/restaurant/:restaurantId"
              component={RestaurantDash}
            />
            <Route
              exact
              path="/dashboard/restaurant/:restaurantId/analytics"
              component={RestaurantAnalytics}
            />
            <Route component={NotFound} />
          </Switch>
        </section>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default withRouter(Routes);
