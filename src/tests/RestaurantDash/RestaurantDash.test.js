import React from "react";
import RestaurantDash from "../../components/RestaurantDash/RestaurantDash";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<RestaurantDash />);
});