import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Notifications from '../components/Notifications';
import { fetchNotifications, setNotificationFilter } from '../actions/notificationActionCreators';
import { getUnreadNotificationsByType } from '../selectors/notificationSelector';

const NotificationsContainer = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(getUnreadNotificationsByType);
  const filter = useSelector(state => state.notifications.filter);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleFilterChange = (filter) => {
    dispatch(setNotificationFilter(filter));
  };

  return (
    <Notifications
      notifications={notifications}
      filter={filter}
      setNotificationFilter={handleFilterChange}
    />
  );
};

export default NotificationsContainer;
