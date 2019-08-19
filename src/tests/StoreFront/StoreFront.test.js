import React from "react";
import StoreFront from "../../components/StoreFront/StoreFront";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<StoreFront />);
});