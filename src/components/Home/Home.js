import React from "react";

export default function Home({ history }) {
  const pageStyle = {
    margin: "0 auto",
    width: "800px"
  };

  return (
    <div style={pageStyle}>
      <h1>HomeSlice</h1>
      <p>
        Introducing <b>HomeSlice</b>: a one-stop pizza shop builder for
        restaurants and customers. No bloatware, no nonsense -- made by pizza
        enthusiasts, for pizza enthusiasts.
      </p>
      <p>
        Setup is fast and easy for restaurants! Just provide your credentials
        and we'll do the rest:
      </p>
      <ul>
        <li>
          <b>Create a menu</b> using our interactive and inuitive menu builder
        </li>
        <li>
          <b>View all orders</b> and update them in real time
        </li>
        <li>
          <b>Use our analytics tool</b> to gain insights on your bestselling
          items
        </li>
      </ul>
      <p>
        Still not sure whether to take the leap? Log in with our demo account
        and try it out for yourself!
      </p>
      <p>
        <b>Email:</b> demo@demo.com
        <br />
        <b>Password:</b> Demo123!
      </p>

      <button onClick={() => history.push("/create-account")}>
        Create a restaurant owner account
      </button>
      <button onClick={() => history.push("/restaurant/1")}>
        Continue as a pizza buyer
      </button>
    </div>
  );
}
