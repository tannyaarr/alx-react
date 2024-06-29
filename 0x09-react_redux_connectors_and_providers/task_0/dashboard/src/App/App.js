import React, { useState, useContext } from "react";
import { connect } from 'react-redux';
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseList from "../CourseList/CourseList";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import { StyleSheet, css } from 'aphrodite';
import AppContext, { AppProvider } from "./AppContext";

const App = ({ isLoggedIn }) => {
  const { user, login, logOut } = useContext(AppContext);

  const [listNotifications, setListNotifications] = useState([
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: "<strong>Urgent requirement</strong>" },
  ]);

  const handleLoginSubmit = (email, password) => {
    login(email, password);
  };

  const markNotificationAsRead = (id) => {
    setListNotifications((prevNotifications) => prevNotifications.filter(notification => notification.id !== id));
  };

  const listCourses = [
    { id: 1, name: "ES6", credit: 60 },
    { id: 2, name: "Webpack", credit: 20 },
    { id: 3, name: "React", credit: 40 },
  ];

  return (
    <React.Fragment>
      <div className={css(styles.app)}>
        <div className={css(styles.headingSection)}>
          <Notifications 
            listNotifications={listNotifications}
            markNotificationAsRead={markNotificationAsRead}
          />
          <Header />
        </div>
        <div className={css(styles.bodySection)}>
          {isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList listCourses={listCourses} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login onSubmit={handleLoginSubmit} />
            </BodySectionWithMarginBottom>
          )}
          <BodySection title="News from the School">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit lectus nec risus cursus, nec ullamcorper libero fringilla. Donec ac dolor a risus semper laoreet. Sed vulputate lobortis mauris, ac eleifend urna laoreet sed.
            </p>
          </BodySection>
        </div>
        <Footer className={css(styles.footer)} />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.ui.get('isUserLoggedIn') // Assuming ui is the name of the slice and using Immutable.js
});

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  headingSection: {
    backgroundColor: '#f5f5f5',
    paddingBottom: '20px',
    borderBottom: '1px solid #ccc',
  },
  bodySection: {
    padding: '20px',
  },
  footer: {
    borderTop: '1px solid #ccc',
    paddingTop: '10px',
    textAlign: 'center',
    fontSize: '0.9em',
    marginTop: '20px',
  },
});

const ConnectedApp = connect(mapStateToProps)(App);

export default () => (
  <AppProvider>
    <ConnectedApp />
  </AppProvider>
);