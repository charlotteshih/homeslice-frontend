import React from "react";
import Payment from "../../components/Payment/Payment";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Payment />);
});