import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from 'aphrodite';
import { connect } from "react-redux";
import { logOut } from "../actions/authActions"; // Replace with your actual logout action import

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottom: '3px solid #e0354b',
    padding: '20px',
  },
  logo: {
    width: '200px',
    height: '200px',
  },
  title: {
    marginLeft: '20px',
    fontSize: '2rem',
    color: '#e0354b',
  },
  logoutSection: {
    marginTop: '10px',
    fontSize: '1rem',
  },
  logoutLink: {
    cursor: 'pointer',
    color: '#e0354b',
    textDecoration: 'underline',
  },
});

const Header = ({ user, logOut }) => {
  return (
    <div>
      <div className={css(styles.header)}>
        <img src={logo} className={css(styles.logo)} alt="logo" />
        <h1 className={css(styles.title)}>School dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <div id="logoutSection" className={css(styles.logoutSection)}>
          Welcome {user.email} (<span className={css(styles.logoutLink)} onClick={logOut}>logout</span>)
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user, // Adjust this according to your actual state structure
});

const mapDispatchToProps = {
  logOut, // Replace with your actual logout action creator
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
