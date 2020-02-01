import React from "react";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<OrderStatus />);
});
