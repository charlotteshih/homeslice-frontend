import React from "react";
import RestaurantCard from "../../components/AdminDash/RestaurantCard";
import { shallow } from 'enzyme';

it("renders without crashing", () => {
  shallow(<RestaurantCard details={{
    id: '1',
    name: 'Demo',
    email: 'demo@demo.com',
    phone: '000-000-0000',
    street_address: '123 Pizza Way',
    city: 'Flavortown',
    state: 'CA',
    zipcode: '90027',
  }}/>);
});