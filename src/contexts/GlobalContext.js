import React from 'react';

export default React.createContext({
  restaurant: {},
  setRestaurantData: function(restaurantData) {
    this.restaurant = restaurantData;
  },
  userIsSignedIn: false,
  setUserIsSignedIn: function(bool) {
    this.userIsSignedIn = bool;
  }
});