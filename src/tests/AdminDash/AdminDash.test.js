import React from "react";
import AdminDash from "../../components/AdminDash/AdminDash";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<AdminDash history={[]} />);
});