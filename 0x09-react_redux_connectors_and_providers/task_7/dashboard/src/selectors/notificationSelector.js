import { createSelector } from 'reselect';

export const filterTypeSelected = (state) => state.notifications.get('filter');
export const getNotifications = (state) => state.notifications.get('notifications');
export const getUnreadNotifications = createSelector(
  getNotifications,
  (notifications) => notifications.filter(notification => !notification.get('isRead'))
);
