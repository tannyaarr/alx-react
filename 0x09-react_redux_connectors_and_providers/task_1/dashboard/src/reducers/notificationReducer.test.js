import { Map, fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER } from '../actions/notificationActionTypes';

describe('notificationReducer', () => {
  const initialState = Map({
    notifications: Map(),
    filter: 'DEFAULT'
  });

  it('should return the default state when no action is passed', () => {
    expect(notificationReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS action', () => {
    const action = {
      type: FETCH_NOTIFICATIONS_SUCCESS,
      data: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', value: 'New data available' }
      ]
    };
    const expectedState = fromJS({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, isRead: false, type: 'default', value: 'New course available' },
        '2': { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        '3': { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      }
    });
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle MARK_AS_READ action', () => {
    const initialStateWithNotifications = fromJS({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, isRead: false, type: 'default', value: 'New course available' },
        '2': { id: 2, isRead: false, type: 'urgent', value: 'New resume available' },
        '3': { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      }
    });
    const action = {
      type: MARK_AS_READ,
      index: 2
    };
    const expectedState = initialStateWithNotifications.setIn(['notifications', '2', 'isRead'], true);
    expect(notificationReducer(initialStateWithNotifications, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SET_TYPE_FILTER action', () => {
    const action = {
      type: SET_TYPE_FILTER,
      filter: 'URGENT'
    };
    const expectedState = initialState.set('filter', 'URGENT');
    expect(notificationReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});