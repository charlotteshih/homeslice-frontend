import React, { useContext, useState, useEffect } from "react";
import DashboardNav from "../Header/DashboardNav";
import RestaurantOrderCard from "./RestaurantOrderCard";
import GlobalContext from "../../contexts/GlobalContext";
import config from "../../config";

export default function RestaurantDash() {
  let currentJWT = localStorage.getItem("jwt");
  let base64url = currentJWT.split(".")[1];
  let payload = JSON.parse(window.atob(base64url));
  let restaurant_id = payload.restaurant_id;

  const [orders, setOrders] = useState({});

  useEffect(() => {
    const getOrdersandCustomers = async restaurant_id => {
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
        .then(res => console.log(res));
    };
    getOrdersandCustomers(restaurant_id);
  }, []);

  return (
    <>
      <DashboardNav />
      <section>
        <h2>New Orders</h2>
        <RestaurantOrderCard />
      </section>
      <section>
        <h2>In Progress</h2>
        <RestaurantOrderCard />
      </section>
    </>
  );
}
