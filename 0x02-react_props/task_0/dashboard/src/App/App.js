import React from "react";
import './App.css';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import Notifications from '../Notifications/Notifications';

function App() {
  return (
    <Notifications/>
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>School dashboard</h1>
      </div>
      <Header/>
      <div className="App-body">
        <Login />
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input type="email" name="email"></input>
          <label htmlFor="password">Password:</label>
          <input type="password" name="password"></input>
          <button>OK</button>
        </form>
      </div>
      <Footer />
      <div className="App-footer">
        Copyright {getFullYear()} - {getFooterCopy()}
      </div>
    </div>
  );
}

export default App;