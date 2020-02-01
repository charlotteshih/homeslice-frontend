import React from "react";
import AdminSignIn from "../../components/Header/AdminSignIn";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<AdminSignIn />);
});