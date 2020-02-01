import React from "react";
import CreateAccount from "../../components/CreateAccount/CreateAccount";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<CreateAccount />);
});