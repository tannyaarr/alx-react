import { markAsRead, setNotificationFilter } from './notificationActionCreators';
import { MARK_AS_READ, SET_TYPE_FILTER, NotificationTypeFilters } from './notificationActionTypes';

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
    const filter = NotificationTypeFilters.DEFAULT;
    const expectedAction = {
      type: SET_TYPE_FILTER,
      filter
    };
    expect(setNotificationFilter(filter)).toEqual(expectedAction);
  });
});
