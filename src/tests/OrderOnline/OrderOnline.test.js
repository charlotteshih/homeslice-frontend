import React from "react";
import OrderOnline from "../../components/OrderOnline/OrderOnline";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<OrderOnline />);
});