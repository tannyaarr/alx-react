import React from 'react';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import BodySection from '../BodySection/BodySection';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authActions';

const App = ({ user, loginRequest }) => {
  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 },
  ];

  const handleLoginSubmit = (email, password) => {
    loginRequest(email, password);
  };

  return (
    <React.Fragment>
      <div className={css(styles.app)}>
        <div className={css(styles.headingSection)}>
          <Notifications />
          <Header />
        </div>
        <div className={css(styles.bodySection)}>
          {user.isLoggedIn ? (
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam suscipit lectus nec risus
              cursus, nec ullamcorper libero fringilla. Donec ac dolor a risus semper laoreet. Sed vulputate
              lobortis mauris, ac eleifend urna laoreet sed.
            </p>
          </BodySection>
        </div>
        <Footer className={css(styles.footer)} />
      </div>
    </React.Fragment>
  );
};

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

const mapStateToProps = (state) => ({
  user: state.user, // Adjust this according to your actual state structure
});

const mapDispatchToProps = {
  loginRequest, // Connect loginRequest action creator
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
