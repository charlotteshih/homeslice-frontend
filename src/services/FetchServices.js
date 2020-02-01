import { API_BASE_URL } from "../config";

const FetchServices = {
  _submitCreateAccount(formData) {
    return fetch(`${API_BASE_URL}/restaurants`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    });
  },
  _submitRestaurantLogin(dataToSubmit) {
    return fetch(`${API_BASE_URL}/authorization/login`, {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  },
  _submitAdminLogin(dataToSubmit) {
    return fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      body: JSON.stringify(dataToSubmit),
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  },
  _submitCreatePizza(formData) {
    return fetch(`${API_BASE_URL}/pizzas`, {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "Application/json"
      }
    });
  },
  _submitCreateOrder(orderData) {
    return fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      body: JSON.stringify(orderData),
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  },
  _submitCreateCustomer(customerData) {
    return fetch(`${API_BASE_URL}/customers`, {
      method: "POST",
      body: JSON.stringify(customerData),
      headers: {
        "Content-Type": "Application/Json"
      }
    });
  },
  _getOrderById(orderId) {
    return fetch(`${API_BASE_URL}/orders/${orderId}`);
  },
  _getOrdersAndCustomersById(restaurantId) {
    if (!restaurantId) {
      throw new Error("restaurant_id is missing. You shouldn't be here.");
    }
    return fetch(`${API_BASE_URL}/restaurants/${restaurantId}/orders`, {
      method: "GET",
      // bearer token is hard-coded until we have settled on a way to pass that information from the sign in form.
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50X2lkIjoxLCJpYXQiOjE1NjUxNDg1MzMsImV4cCI6MTU2NTIzNDkzMywic3ViIjoiZGVtb0BkZW1vLmNvbSJ9.9T2jUsJ-0wRKE7IsbqHo86tBFMnQc3MUvQdxRjukikk"
      }
    });
  },
  _getAllRestaurants() {
    return fetch(`${API_BASE_URL}/restaurants/`);
  },
  _getRestaurantById(restaurantId) {
    return fetch(`${API_BASE_URL}/restaurants/${restaurantId}`);
  },
  _getPizzaById(pizzaId) {
    return fetch(`${API_BASE_URL}/pizzas/${pizzaId}`);
  },
  _updateOrderStatusById(orderId, status) {
    return fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/JSON"
      },
      body: JSON.stringify({
        order_status: status
      })
    });
  },
  _deleteRestaurantById(restaurantId) {
    return fetch(`${API_BASE_URL}/restaurants/${restaurantId}`, {
      method: "DELETE"
    });
  },
  _adminDeleteRestaurantById(restaurantId, auth) {
    return fetch(`${API_BASE_URL}/admin/restaurant/${restaurantId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth}`
      }
    });
  },
  _makeStripePayment(token) {
    return fetch(`${API_BASE_URL}/stripe/charge`, {
      method: "POST",
      headers: { "Content-Type": "Application/JSON" },
      body: JSON.stringify(token)
    });
  }
};

export default FetchServices;
