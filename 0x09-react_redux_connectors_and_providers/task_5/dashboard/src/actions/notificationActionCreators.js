import { bindActionCreators } from 'redux';
import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

export function markAsRead(index) {
  return {
    type: MARK_AS_READ,
    index
  };
}

export function setNotificationFilter(filter) {
  return {
    type: SET_TYPE_FILTER,
    filter
  };
}

export function setLoadingState(isLoading) {
  return {
    type: SET_LOADING_STATE,
    isLoading
  };
}

export function setNotifications(notifications) {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    notifications
  };
}

export function fetchNotifications() {
  return async (dispatch) => {
    dispatch(setLoadingState(true)); // Set loading state to true before fetching

    try {
      const response = await fetch('/notifications.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      dispatch(setNotifications(data)); // Dispatch action with fetched notifications
    } catch (error) {
      console.error('Error fetching notifications:', error);
      // Handle error cases if needed
    } finally {
      dispatch(setLoadingState(false)); // Set loading state to false after fetch completes
    }
  };
}

export const boundNotificationActionCreators = (dispatch) => bindActionCreators({
  markAsRead,
  setNotificationFilter,
  fetchNotifications
}, dispatch);
