import React, { Component } from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from 'aphrodite';
import AppContext from "../App/AppContext";

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

class Header extends Component {
  static contextType = AppContext;

  render() {
    const { user, logOut } = this.context;

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
  }
}

export default Header;