import React from "react";
import logo from "../assets/holberton-logo.jpg";
import { StyleSheet, css } from 'aphrodite';

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
});

function Header() {
  return (
    <div className={css(styles.header)}>
      <img src={logo} className={css(styles.logo)} alt="logo" />
      <h1 className={css(styles.title)}>School dashboard</h1>
    </div>
  );
}

export default Header;