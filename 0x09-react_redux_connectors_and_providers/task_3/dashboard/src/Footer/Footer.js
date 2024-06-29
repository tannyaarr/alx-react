import React from "react";
import "./Footer.css";
import { getFullYear, getFooterCopy } from "../utils/utils";
import { connect } from "react-redux";

function Footer({ user }) {
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

const mapStateToProps = (state) => ({
  user: state.user, // Adjust this according to your actual state structure
});

export default connect(mapStateToProps)(Footer);