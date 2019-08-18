import React from "react";
import CancelOrderLightBox from "../../components/RestaurantDash/CancelOrderLightBox";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<CancelOrderLightBox orderToCancel={{order: 1}}/>);
});