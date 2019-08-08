import React, { useContext, useState, useEffect } from "react";
import DashboardNav from "../Header/DashboardNav";
import RestaurantOrderList from "./RestaurantOrderList";
import GlobalContext from "../../contexts/GlobalContext";
import config from "../../config";

export default function RestaurantDash() {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };
  
  let currentJWT = localStorage.getItem("jwt");
  let base64url = currentJWT.split(".")[1];
  let payload = JSON.parse(window.atob(base64url));
  let restaurant_id = payload.restaurant_id;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrdersAndCustomers = restaurant_id => {
      if (!restaurant_id) {
        throw new Error("restaurant_id is missing. You shouldn't be here.");
      }

      fetch(`${config.apiBaseUrl}/restaurants/${restaurant_id}/orders`, {
        method: "GET",
        // bearer token is hard-coded until we have settled on a way to pass that information from the sign in form.
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN0YXVyYW50X2lkIjoxLCJpYXQiOjE1NjUxNDg1MzMsImV4cCI6MTU2NTIzNDkzMywic3ViIjoiZGVtb0BkZW1vLmNvbSJ9.9T2jUsJ-0wRKE7IsbqHo86tBFMnQc3MUvQdxRjukikk"
        }
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          console.log("res", res);
          setOrders(res.orders);
          return res;
        });
    };
    getOrdersAndCustomers(restaurant_id);
  }, []);

  return (
    <div style={pageStyle}>
      <section>
        <h2>New Orders</h2>
        <RestaurantOrderList
          orderListCategory={"Ordered"}
          orders={orders}
          setOrders={setOrders}
        />
      </section>
      <section>
        <h2>In Progress</h2>
        <RestaurantOrderList
          orderListCategory={"In Progress"}
          orders={orders}
          setOrders={setOrders}
        />
      </section>
    </div>
  );
}
