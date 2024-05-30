import React from "react";
import "./Notifications.css";
import PropTypes from "prop-types";

function NotificationItem({ type, html, value }) {
  return (
    <>
      {type && value ? (
        <li data-notification-type={type} onClick={() => markAsRead(id)}>
          {value}
          </li> 
      ) : null}
      {html ? (
        <li
          data-urgent 
          dangerouslySetInnerHTML={{ __html: html }}
          onClick={() => markAsRead(id)}
        ></li>
      ) : null}
    </>
  );
}

NotificationItem.propTypes = {
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  html: PropTypes.shape({
  __html: PropTypes.string,
  }),
  markAsRead: PropTypes.func.isRequired,
};

NotificationItem.defaultProps = {
  type: "default",
};

export default NotificationItem;