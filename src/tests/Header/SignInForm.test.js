import React from "react";
import SignInForm from "../../components/Header/SignInForm";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<SignInForm />);
});