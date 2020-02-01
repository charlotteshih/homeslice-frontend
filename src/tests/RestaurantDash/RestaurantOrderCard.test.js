import React from "react";
import RestaurantOrderCard from "../../components/RestaurantDash/RestaurantOrderCard";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<RestaurantOrderCard order={{pizza_type: "Cheese"}}/>);
});