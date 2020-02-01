import React from "react";
import NotFound from "../../components/NotFound/NotFound";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<NotFound/>);
});