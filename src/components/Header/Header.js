import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
import DashBoardNav from "./DashboardNav";
import SignInForm from "./SignInForm";
import AdminSignIn from "./AdminSignIn";
import jwt from "jsonwebtoken";
import FetchServices from "../../services/FetchServices";

export default function Header({ history }) {
  let [signInFormsShowing, setSignInFormsShowing] = useState(false);
  let context = useContext(GlobalContext);
  const token = localStorage.getItem("jwt");
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (localStorage.getItem("jwt")) {
      context.setUserIsSignedIn(true);
      let decoded = jwt.decode(token);
      let userId = 0;
      decoded.sub === "Admin"
        ? (userId = decoded.admin_id)
        : (userId = decoded.restaurant_id);

      FetchServices._getRestaurantById(userId)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error({ ...res });
        })
        .then(json => {
          return context.setRestaurantData({ ...json });
        })
        .then(() => {
          if (decoded.sub === "Admin") {
            context.setUserIsAdmin(true);
          }
        });
      // console.dir(decoded);
    }
  }, []);

  return (
    <header className="Header__container">
      <nav className={"Header__nav"}>
        <Link className="Header__home-link link" to="/">
          HomeSlice
        </Link>
        {context.userIsSignedIn ? (
          <>
            <button
              className={`Header__menu-toggle`}
              onClick={() => setSignInFormsShowing(!signInFormsShowing)}
            >
              {signInFormsShowing ? "Close" : "Menu"}
            </button>
            {signInFormsShowing ? (
              <DashBoardNav setSignInFormsShowing={setSignInFormsShowing} />
            ) : (
              ""
            )}
          </>
        ) : (
          <>
            <button
              className={`Header__menu-toggle`}
              onClick={() => setSignInFormsShowing(!signInFormsShowing)}
            >
              {signInFormsShowing ? "Close" : "Sign In"}
            </button>
            {signInFormsShowing ? (
              <div className="Header__sign-in-forms__container">
                <SignInForm
                  setSignInFormsShowing={setSignInFormsShowing}
                  history={history}
                />
                <AdminSignIn
                  setSignInFormsShowing={setSignInFormsShowing}
                  history={history}
                />
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </nav>
    </header>
  );
}
