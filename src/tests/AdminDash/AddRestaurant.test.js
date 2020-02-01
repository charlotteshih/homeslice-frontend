import React from "react";
import AddRestaurant from "../../components/AdminDash/AddRestaurant";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<AddRestaurant />);
});