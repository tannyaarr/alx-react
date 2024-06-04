import React, { Component } from "react";
import { StyleSheet, css } from 'aphrodite';
import closeIcon from "../assets/close-icon.png";
import NotificationItem from "./NotificationItem";
import PropTypes from "prop-types";
import NotificationItemShape from "../NotificationItemShape";

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
    padding: 0, // Remove padding
    fontSize: '20px', // Set font size to 20px
  },
  menuItem: {
    textAlign: 'right',
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

class Notifications extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.listNotifications.length > this.props.listNotifications.length;
  }

  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <React.Fragment>
        {displayDrawer ? (
          <div className={css(styles.flexArea)}>
            <div className={css(styles.menuItem)}>
              <p>Your notifications</p>
            </div>
            <div className={css(styles.notifications)}>
              <ul style={{ padding: 0 }}> {/* Remove padding for ul element */}
                {listNotifications && listNotifications.length > 0 ? (
                  listNotifications.map(({ id, html, type, value }) => (
                    <React.Fragment key={id}>
                      <NotificationItem
                        id={id}
                        type={type}
                        value={value}
                        html={html}
                        markAsRead={this.markAsRead}
                      />
                    </React.Fragment>
                  ))
                ) : (
                  <div>
                    <NotificationItem value="No new notification for now" />
                    <button
                      className={css(styles.button)}
                      aria-label="Close"
                      onClick={() => console.log("Close button has been clicked")}
                    >
                      <img src={closeIcon} alt="closeIcon" width="10px" />
                    </button>
                  </div>
                )}
              </ul>
            </div>
          </div>
        ) : (
          <div className={css(styles.menuItem)}>
            <p>Your notifications</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      value: PropTypes.string,
      html: PropTypes.shape({
        __html: PropTypes.string,
      }),
    })
  ),
};

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
};

export default Notifications;