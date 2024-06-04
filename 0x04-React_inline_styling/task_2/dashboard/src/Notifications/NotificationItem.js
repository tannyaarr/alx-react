import React from "react";
import { StyleSheet, css } from 'aphrodite';
import PropTypes from "prop-types";

const styles = StyleSheet.create({
  default: {
    color: 'blue',
  },
  urgent: {
    color: 'red',
    fontWeight: 'bold',
  },
});

const NotificationItem = React.memo(({ id, type, html, value, markAsRead }) => {
  return (
    <>
      {type && value ? (
        <li
          className={css(type === 'urgent' ? styles.urgent : styles.default)}
          onClick={() => markAsRead(id)}
        >
          {value}
        </li>
      ) : null}
      {html ? (
        <li
          className={css(styles.urgent)}
          dangerouslySetInnerHTML={{ __html: html.__html }}
          onClick={() => markAsRead(id)}
        ></li>
      ) : null}
    </>
  );
});

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