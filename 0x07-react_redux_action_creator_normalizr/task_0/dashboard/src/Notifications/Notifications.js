import React, { PureComponent } from "react";
import { StyleSheet, css } from 'aphrodite';
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "../NotificationItemShape";

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
});

class Notifications extends PureComponent {
  render() {
    const { displayDrawer, listNotifications, handleDisplayDrawer, handleHideDrawer, markNotificationAsRead } = this.props;
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
              <ul style={{ padding: 0 }}>
                {listNotifications && listNotifications.length > 0 ? (
                  listNotifications.map(({ id, html, type, value }) => (
                    <NotificationItem
                      key={id}
                      id={id}
                      type={type}
                      value={value}
                      html={html}
                      markAsRead={markNotificationAsRead}
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
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
  markNotificationAsRead: PropTypes.func,
};

Notifications.defaultProps = {
  displayDrawer: false,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  listNotifications: [],
  markNotificationAsRead: () => {},
};

export default Notifications;