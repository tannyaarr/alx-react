import { createSelector } from 'reselect';

export const filterTypeSelected = (state) => state.notifications.get('filter');

export const getNotifications = (state) => state.notifications.get('notifications');

export const getUnreadNotificationsByType = createSelector(
  [filterTypeSelected, getNotifications],
  (filter, notifications) => {

    const unreadNotifications = notifications.filter(notification => !notification.get('isRead'));

    if (filter === 'urgent') {
      return unreadNotifications.filter(notification => notification.get('type') === 'urgent');
    }

    return unreadNotifications;
  }
);
