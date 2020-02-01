import React from "react";
import RestaurantOrderList from "../../components/RestaurantDash/RestaurantOrderList";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<RestaurantOrderList />);
});