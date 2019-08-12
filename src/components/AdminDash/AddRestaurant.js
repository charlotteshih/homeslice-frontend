import React, { useState } from 'react'
import CreateAccount from '../CreateAccount/CreateAccount';

export default function AddRestaurant(props) {

  let [isExpanded, setIsExpanded] = useState(false);

  if(isExpanded) {
    return (
      <div>
        <button onClick={() => setIsExpanded(false)}>Collapse</button>
        <CreateAccount 
          setIsExpanded={setIsExpanded}
          setRestaurants={props.setRestaurants}
          restaurants={props.restaurants}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <button onClick={() => setIsExpanded(true)}>Add Restaurant</button>
      </div>
    )
  }
}
