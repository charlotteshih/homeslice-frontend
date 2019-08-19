import React from "react";
import DeleteRestaurantLightBox from "../../components/AdminDash/DeleteRestaurantLightBox";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<DeleteRestaurantLightBox />);
});