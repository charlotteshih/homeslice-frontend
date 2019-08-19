import React from "react";
import DashboardNav from "../../components/Header/DashboardNav";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<DashboardNav payload={{restaurant_id: 1}}/>);
});

