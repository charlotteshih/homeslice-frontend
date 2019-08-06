import React, {useState, useEffect, useContext} from 'react'

export default function CreateAccount() {

  return (
    <div>
      <h1>Create Account</h1>
      <hr />
      <form>
        <label for="restaurantNameInput">Restaurant name</label>
        <input id="restaurantNameInput" type="text"/>

        <label for="emailInput">Email</label>
        <input id="emailInput" type="text"/>

        <label for="passwordInput">Password</label>
        <input id="passwordInput" type="text"/>

        <label for="phoneInput">Phone</label>
        <input id="phoneInput" type="text"/>

        <label for="streetAddressInput">Street Address</label>
        <input id="streetAddressInput" type="text"/>

        <label for="cityInput">City</label>
        <input id="cityInput" type="text"/>

        <label for="stateInput">State</label>
        <input id="stateInput" type="text"/>

        <label for="zipcodeInput">zipcode</label>
        <input id="zipcodeInput" type="text"/>

        <input type="submit" value="Create Account" />
      </form>
    </div>
  )
}
