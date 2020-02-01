const signedInUser = {
  restaurantData: {
    id: '1',
    name: 'Demo',
    email: 'demo@demo.com',
    phone: '000-000-0000',
    street_address: '123 Pizza Way',
    city: 'Flavortown',
    state: 'CA',
    zipcode: '90027',
  },
  orderData: {
    id: '19',
    restaurant_id: '1',
    pizza_id: '16',
    customer_id: '9',
    date_created: '2019-08-18T10:07:05.892Z',
    order_status: 'Ordered',
    order_total: 13.00,
  },
  pizzaData: {
    id: '16',
    size: 'Large',
    type: 'Pepperoni'
  },
  customerData: {
    id: '9',
    first_name: 'bob',
    last_name: 'everyman',
    email: 'email@gmail.com',
    phone: '(123) 123-1234',
    street_address: '123 Fake Street',
    city: 'Anytown',
    state: 'CA',
    zipcode: '90210',
    notes: '',
  },
  userIsSignedIn: true,
  userIsAdmin: false
}

const signedInAdmin = {
  restaurantData: {
    id: '1',
    name: 'Demo',
    email: 'demo@demo.com',
    phone: '000-000-0000',
    street_address: '123 Pizza Way',
    city: 'Flavortown',
    state: 'CA',
    zipcode: '90027',
  },
  orderData: {
    id: '19',
    restaurant_id: '1',
    pizza_id: '16',
    customer_id: '9',
    date_created: '2019-08-18T10:07:05.892Z',
    order_status: 'Ordered',
    order_total: 13.00,
  },
  pizzaData: {
    id: '16',
    size: 'Large',
    type: 'Pepperoni'
  },
  customerData: {
    id: '9',
    first_name: 'bob',
    last_name: 'everyman',
    email: 'email@gmail.com',
    phone: '(123) 123-1234',
    street_address: '123 Fake Street',
    city: 'Anytown',
    state: 'CA',
    zipcode: '90210',
    notes: '',
  },
  userIsSignedIn: true,
  userIsAdmin: true
}

const notSignedInUser = {
  restaurantData: {
    id: '1',
    name: 'Demo',
    email: 'demo@demo.com',
    phone: '000-000-0000',
    street_address: '123 Pizza Way',
    city: 'Flavortown',
    state: 'CA',
    zipcode: '90027',
  },
  orderData: {
    id: '19',
    restaurant_id: '1',
    pizza_id: '16',
    customer_id: '9',
    date_created: '2019-08-18T10:07:05.892Z',
    order_status: 'Ordered',
    order_total: 13.00,
  },
  pizzaData: {
    id: '16',
    size: 'Large',
    type: 'Pepperoni'
  },
  customerData: {
    id: '9',
    first_name: 'bob',
    last_name: 'everyman',
    email: 'email@gmail.com',
    phone: '(123) 123-1234',
    street_address: '123 Fake Street',
    city: 'Anytown',
    state: 'CA',
    zipcode: '90210',
    notes: '',
  },
  userIsSignedIn: false,
  userIsAdmin: false
}


export default {
  notSignedInUser,
  signedInUser,
  signedInAdmin
}