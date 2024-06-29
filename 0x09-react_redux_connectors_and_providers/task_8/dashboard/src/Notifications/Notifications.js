
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { StyleSheet, css } from 'aphrodite';
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import { fetchNotifications, setNotificationFilter, markNotificationAsRead } from "../actions/notificationActionCreators";
import { getUnreadNotificationsByType } from "../selectors/notificationSelector";

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0px)',
  },
  '50%': {
    transform: 'translateY(-5px)',
  },
  '100%': {
    transform: 'translateY(5px)',
  },
};

const opacityKeyframes = {
  '0%': {
    opacity: 0.5,
  },
  '100%': {
    opacity: 1,
  },
};

const styles = StyleSheet.create({
  flexArea: {
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
    padding: 0,
    fontSize: '20px',
  },
  menuItem: {
    textAlign: 'right',
    position: 'absolute',
    right: '0',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    animationName: [bounceKeyframes, opacityKeyframes],
    animationDuration: '0.5s, 1s',
    animationIterationCount: '3',
    ':hover': {
      animationName: [bounceKeyframes, opacityKeyframes],
      animationDuration: '0.5s, 1s',
      animationIterationCount: '3',
    },
  },
  notifications: {
    border: '1px dashed #e1354b',
    padding: '10px',
    position: 'relative',
    marginBottom: '20px',
  },
  button: {
    color: "#3a3a3a",
    fontWeight: "bold",
    background: "none",
    border: "none",
    fontSize: "10px",
    position: "absolute",
    right: "2px",
    top: "2px",
    cursor: "pointer",
  },
  filterButton: {
    margin: '5px',
    padding: '10px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontSize: '20px',
  },
});

class Notifications extends PureComponent {
  componentDidMount() {
    const { fetchNotifications } = this.props;
    fetchNotifications();
  }

  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, setNotificationFilter } = this.props;
    return (
      <React.Fragment>
        {displayDrawer ? (
          <div className={css(styles.flexArea)}>
            <div className={css(styles.notifications)}>
              <button
                className={css(styles.button)}
                aria-label="Close"
                onClick={handleHideDrawer}
              >
                <img src={closeIcon} alt="closeIcon" width="10px" />
              </button>
              <p>Here is the list of notifications</p>
              <button
                className={css(styles.filterButton)}
                onClick={() => setNotificationFilter('URGENT')}
              >
                ‼️
              </button>
              <button
                className={css(styles.filterButton)}
                onClick={() => setNotificationFilter('DEFAULT')}
              >
                💠
              </button>
              <ul style={{ padding: 0 }}>
                {listNotifications && listNotifications.length > 0 ? (
                  listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      id={id}
                      type={type}
                      value={value}
                      html={html}
                      markAsRead={() => this.props.markNotificationAsRead(id)}
                    />
                  ))
                ) : (
                  <NotificationItem value="No new notification for now" />
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={css(styles.menuItem)} onClick={handleDisplayDrawer}>
            <p>Your notifications</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  listNotifications: PropTypes.array.isRequired, // Update PropTypes for listNotifications
  fetchNotifications: PropTypes.func.isRequired,
  setNotificationFilter: PropTypes.func.isRequired,
  markNotificationAsRead: PropTypes.func.isRequired,
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: [],
};

const mapStateToProps = (state) => ({
  listNotifications: getUnreadNotificationsByType(state),
});

export default connect(mapStateToProps, { fetchNotifications, setNotificationFilter, markNotificationAsRead })(Notifications);