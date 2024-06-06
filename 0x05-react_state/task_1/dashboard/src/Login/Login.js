import React, { Component } from "react";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };

    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
  }

  handleLoginSubmit(event) {
    event.preventDefault();
    this.setState({ isLoggedIn: true });
  }

  handleChangeEmail(event) {
    this.setState({ email: event.target.value }, this.toggleSubmitButton);
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value }, this.toggleSubmitButton);
  }

  toggleSubmitButton() {
    const { email, password } = this.state;
    this.setState({ enableSubmit: email.length > 0 && password.length > 0 });
  }

  render() {
    const { email, password, enableSubmit } = this.state;

    return (
      <div className={css(styles.appBody)}>
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email" className={css(styles.formLabel)}>Email:</label>
          <input
            type="email"
            name="email"
            className={css(styles.formInput)}
            value={email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password" className={css(styles.formLabel)}>Password:</label>
          <input
            type="password"
            name="password"
            className={css(styles.formInput)}
            value={password}
            onChange={this.handleChangePassword}
          />
          <br />
          <input
            type="submit"
            value="Submit"
            disabled={!enableSubmit}
            className={css(styles.formInput)}
          />
        </form>
      </div>
    );
  }
}

export default Login;