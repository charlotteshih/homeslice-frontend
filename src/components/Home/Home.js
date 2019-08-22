import React from "react";
import BackgroundImg from '../../images/pizza_bg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListAlt, faChartBar } from '@fortawesome/free-regular-svg-icons';

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
        <section className="Home__info--overlay">
          <section className="Home__info--blurb">
            <h2>
              Introducing
            </h2>
            <h1>HomeSlice!</h1>
            <p className="Home_paragraph">
              A one-stop pizza shop builder for mom-and-pop restaurants<br />
              Built by pizza enthusiasts for pizza enthusiasts
            </p>
            <div className="space" />
            <p className="Home_paragraph">
              Try it out for yourself on our demo account!
            </p>
            <p className="Home_paragraph">
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
      </section>
      <section>
        <ul className="Home__rest-features">
          <li className="Home__rest-features__list-item">
            <FontAwesomeIcon className="Home__rest-features__icons" icon={faEdit} />
            <p className="Home__rest-features__text">
              <b>Create a menu</b><br />using our interactive menu builder.
            </p>
          </li>
          <li className="Home__rest-features__list-item">
            <FontAwesomeIcon className="Home__rest-features__icons" icon={faListAlt} />
            <p className="Home__rest-features__text">
              <b>View all orders</b><br />and update them in real time.
            </p>
          </li>
          <li className="Home__rest-features__list-item">
            <FontAwesomeIcon className="Home__rest-features__icons" icon={faChartBar} />
            <p className="Home__rest-features__text">
              <b>Gain insights</b><br />on your bestselling products with our built-in analytics tool.
            </p>
          </li>
        </ul>
      </section>
    </div>
  );
}
