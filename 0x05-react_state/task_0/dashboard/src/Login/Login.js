import React from "react";
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  appBody: {
    fontSize: '1rem',
    padding: '2em',
    borderBottom: '3px solid #e0354b',
    height: '45%',
  },
  formInput: {
    margin: '10px',
  },
  formLabel: {
    marginBottom: '10px',
  },
});

function Login() {
  return (
    <div className={css(styles.appBody)}>
      <p>Login to access the full dashboard</p>
      <form>
        <label htmlFor="email" className={css(styles.formLabel)}>Email:</label>
        <input type="email" name="email" className={css(styles.formInput)} />
        <label htmlFor="password" className={css(styles.formLabel)}>Password:</label>
        <input type="password" name="password" className={css(styles.formInput)} />
        <br />
        <button>OK</button>
      </form>
    </div>
  );
}

export default Login;