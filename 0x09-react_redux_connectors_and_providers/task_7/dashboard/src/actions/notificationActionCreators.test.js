import { markAsRead, setNotificationFilter, setLoadingState, setNotifications, fetchNotifications } from './notificationActionCreators';
import { MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE, FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

describe('notification action creators', () => {
  test('markAsRead action', () => {
    const index = 1;
    const expectedAction = {
      type: MARK_AS_READ,
      index
    };
    expect(markAsRead(index)).toEqual(expectedAction);
  });

  test('setNotificationFilter action', () => {
    const filter = 'DEFAULT'; // Assuming you are using strings for filters
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter
    };
    expect(setNotificationFilter(filter)).toEqual(expectedAction);
  });

  test('setLoadingState action', () => {
    const loading = true;
    const expectedAction = {
      type: SET_LOADING_STATE,
      loading
    };
    expect(setLoadingState(loading)).toEqual(expectedAction);
  });

  test('setNotifications action', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ];
    const expectedAction = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: notifications
    };
    expect(setNotifications(notifications)).toEqual(expectedAction);
  });

  // Mock fetchNotifications function to test it separately
  const mockDispatch = jest.fn();
  const mockFetch = () => {
    return Promise.resolve([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ]);
  };

  test('fetchNotifications action', async () => {
    const setLoadingStateAction = setLoadingState(true);
    const setNotificationsAction = setNotifications([
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
    ]);

    await fetchNotifications()(mockDispatch, mockFetch);
    expect(mockDispatch).toHaveBeenCalledWith(setLoadingStateAction);
    expect(mockDispatch).toHaveBeenCalledWith(setNotificationsAction);
  });
});
