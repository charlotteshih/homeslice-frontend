import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
import FetchServices from "../../services/FetchServices";
// import BackgroundImg from '../../images/restaurant_default.jpg';

export default function StoreFront({ match }) {
  // const bgStyle = {
  //   backgroundImage: `url(${BackgroundImg})`,
  //   backgroundPosition: 'center center',
  //   backgroundRepeat: 'no-repeat',
  //   backgroundSize: 'cover',
  // }

  const { restaurantData, setRestaurantData } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    FetchServices._getRestaurantById(match.params.restaurantId)
      .then(res => {
        console.log("storefron-res", res);
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(res);
        }
      })
      .then(resJson => {
        console.log("resJson", resJson);
        return setRestaurantData({ ...resJson });
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (isLoading) {
    return (
      <div className="padding-top-60px">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="StoreFront__container padding-top-60px">
        <section className="StoreFront__secondary-container">
          <img
            className="StoreFront__restaurant-image"
            src={require('../../images/restaurant_default.jpg')}
          />

          <section className="StoreFront__restaurant-info">
            <h3>{restaurantData.name}</h3>
            <div>{restaurantData.street_address}</div>
            <div>{`${restaurantData.city}, ${restaurantData.state} ${
              restaurantData.zipcode
              }`}</div>
            <div>{restaurantData.phone}</div>
            <div>{restaurantData.email}</div>
            <button className="StoreFront__order-button btn">
              <Link
                className="link"
                to={`/restaurant/${restaurantData.id}/order-online`}
              >
                Order Online
              </Link>
            </button>
          </section>
        </section>

        <h1 className="StoreFront__menu--header">Menu</h1>
        <section className="StoreFront__menu">
          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/cheese.png`)}
              alt="cheese pizza"
            />
            <p>Cheese</p>
          </div>

          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/pepperoni.png`)}
              alt="pepperoni pizza"
            />
            <p>Pepperoni</p>
          </div>

          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/supreme.png`)}
              alt="supreme pizza"
            />
            <p>Supreme</p>
          </div>

          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/veggie.png`)}
              alt="veggie pizza"
            />
            <p>Veggie</p>
          </div>

          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/hawaiian.png`)}
              alt="hawaiian pizza"
            />
            <p>Hawaiian</p>
          </div>

          <div className="StoreFront__menu-image-container">
            <img
              className="StoreFront__menu-image"
              src={require(`../../images/bbq-chicken.png`)}
              alt="bbq chicken pizza"
            />
            <p>BBQ Chicken</p>
          </div>
        </section>
      </div>
    );
  }
}
