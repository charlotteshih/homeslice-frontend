import React, {useState, useEffect, useContext} from 'react'

export default function CreateAccount() {

  return (
    <div>
      <h1>Create Account</h1>
      <hr />
      <form>
        <label for="restaurantName">Restaurant name</label>
        <input id="restaurnatName" type="text"/>
      </form>
    </div>
  )
}
