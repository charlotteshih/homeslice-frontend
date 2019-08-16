import React from "react";

export default function Home({ history }) {
  return (
    <div className="Home__container padding-top-60px">
      <section className="Home__info">
        <p>
          Introducing <b>HomeSlice</b>: a one-stop pizza shop builder for
          restaurants and customers. No bloatware, no nonsense -- made by pizza
          enthusiasts, for pizza enthusiasts.
        </p>
        <p>
          Setup is fast and easy for restaurants! Just provide your credentials
          and we'll do the rest.
        </p>
        <p>
          Still not sure whether to take the leap? Log in with our demo account
          and try it out for yourself!
        </p>
        <br />
        <p>
          <b>Email:</b> demo@demo.com
          <br />
          <b>Password:</b> Demo123!
        </p>
        <br />
        <section className="Home__buttons">
          <button
            className="btn"
            onClick={() => history.push("/create-account")}
          >
            Get started
          </button>
        </section>
      </section>
      <section>
        <ul className="Home__rest-features">
          <li className="Home__rest-features__list-item">
            <div className="Home__rest-features__icons" />
            <p className="Home__rest-features__text">
              <b>Create a menu</b>
              <br /> using our interactive and intuitive menu builder.
            </p>
          </li>
          <li className="Home__rest-features__list-item">
            <div className="Home__rest-features__icons" />
            <p className="Home__rest-features__text">
              <b>View all orders</b>
              <br /> and update them in real time.
            </p>
          </li>
          <li className="Home__rest-features__list-item">
            <div className="Home__rest-features__icons" />
            <p className="Home__rest-features__text">
              <b>Use our analytics tool</b>
              <br /> to gain insights on your bestselling items.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
