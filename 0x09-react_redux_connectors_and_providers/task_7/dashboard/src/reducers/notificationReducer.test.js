import { fromJS } from 'immutable';
import notificationReducer from './notificationReducer';
import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE } from '../actions/notificationActionTypes';

describe('notificationReducer tests', () => {
  it('should return the initial state', () => {
    const initialState = notificationReducer(undefined, {});
    expect(initialState).toEqual(fromJS({
      notifications: {},
      filter: 'DEFAULT',
      loading: false, // Ensure loading attribute is part of initial state
    }));
  });

  it('should handle FETCH_NOTIFICATIONS_SUCCESS', () => {
    const data = {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    };
    const action = { type: FETCH_NOTIFICATIONS_SUCCESS, data };
    const state = notificationReducer(undefined, action);
    expect(state.get('notifications').size).toEqual(2); // Adjust based on your actual logic
  });

  it('should handle MARK_AS_READ', () => {
    const initialState = fromJS({
      notifications: {
        1: { id: 1, type: 'default', value: 'New course available' },
        2: { id: 2, type: 'urgent', value: 'New resume available' },
      },
    });
    const action = { type: MARK_AS_READ, index: 2 };
    const nextState = notificationReducer(initialState, action);
    expect(nextState.getIn(['notifications', '2', 'isRead'])).toBe(true);
  });

  it('should handle SET_TYPE_FILTER', () => {
    const action = { type: SET_TYPE_FILTER, filter: 'URGENT' };
    const nextState = notificationReducer(undefined, action);
    expect(nextState.get('filter')).toEqual('URGENT');
  });

  it('should handle SET_LOADING_STATE', () => {
    const action = { type: SET_LOADING_STATE, loading: true };
    const nextState = notificationReducer(undefined, action);
    expect(nextState.get('loading')).toBe(true);
  });
});
