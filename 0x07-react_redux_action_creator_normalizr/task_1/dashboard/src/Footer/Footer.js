import React, { useContext } from "react";
import "./Footer.css";
import { getFullYear, getFooterCopy } from "../utils/utils";
import AppContext from "../App/AppContext";

function Footer() {
  const { user } = useContext(AppContext);

  return (
    <>
      <div className="App-footer">
        Copyright {getFullYear()} - {getFooterCopy()}
        {user.isLoggedIn && (
          <p>
            <a href="/contact" id="contactUs">Contact us</a>
          </p>
        )}
      </div>
    </>
  );
}

export default Footer;
