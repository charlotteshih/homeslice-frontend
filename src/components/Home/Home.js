import React from "react";
import BackgroundImg from '../../images/pizza_bg.jpg';

export default function Home({ history }) {
  const bgStyle = {
    backgroundImage: `url(${BackgroundImg})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
  return (
    <div className="Home__container padding-top-60px">
      <section className="Home__info" style={bgStyle}>
        <section className="Home__info--blurb">
          <h2>
            Introducing
          </h2>
          <h1>HomeSlice!</h1>
          <p>
            A one-stop pizza shop builder for restaurants and customers<br />
            Built by pizza enthusiasts for pizza enthusiasts
          </p>
          <p>
            Take us for a spin!
          </p>
          <p>
            <b>Email:</b> demo@demo.com
            <br />
            <b>Password:</b> Demo123!
          </p>
          <section className="Home__buttons">
            <button
              className="btn"
              onClick={() => history.push("/create-account")}
            >
              Get Started
            </button>
          </section>
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
