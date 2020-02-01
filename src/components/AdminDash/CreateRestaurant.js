import React, { useState } from 'react'
import CreateAccount from '../CreateAccount/CreateAccount';

export default function CreateRestaurant(props) {
  //reuses the CreateAccount component only permanently expanded.
  let [isExpanded, setIsExpanded] = useState(false);

  if(isExpanded) {
    return (
      <div>
        <button 
          className="btn"
          onClick={() => setIsExpanded(false)}>Collapse</button>
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
        <button 
          className="btn"
          onClick={() => setIsExpanded(true)}>Add Restaurant</button>
      </div>
    )
  }
}
