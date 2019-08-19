import React from "react";
import Home from "../../components/Home/Home";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<Home />);
});