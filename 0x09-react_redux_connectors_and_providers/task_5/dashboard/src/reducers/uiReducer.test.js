import { Map } from 'immutable';
import uiReducer from './uiReducer';
import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT 
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = Map({
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {}
  });

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {}).toJS()).toEqual(initialState.toJS());
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: 'SELECT_COURSE' }).toJS()).toEqual(initialState.toJS());
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER action', () => {
    const expectedState = initialState.set('isNotificationDrawerVisible', true);
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle HIDE_NOTIFICATION_DRAWER action', () => {
    const stateWithDrawerVisible = initialState.set('isNotificationDrawerVisible', true);
    const expectedState = initialState.set('isNotificationDrawerVisible', false);
    expect(uiReducer(stateWithDrawerVisible, { type: HIDE_NOTIFICATION_DRAWER }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const user = { email: 'test@test.com', name: 'Test User' };
    const expectedState = initialState.set('isUserLoggedIn', true).set('user', user);
    expect(uiReducer(initialState, { type: LOGIN_SUCCESS, user }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGIN_FAILURE action', () => {
    const expectedState = initialState.set('isUserLoggedIn', false);
    expect(uiReducer(initialState, { type: LOGIN_FAILURE }).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle LOGOUT action', () => {
    const stateWithUserLoggedIn = initialState.set('isUserLoggedIn', true).set('user', { email: 'test@test.com', name: 'Test User' });
    const expectedState = initialState.set('isUserLoggedIn', false).set('user', null);
    expect(uiReducer(stateWithUserLoggedIn, { type: LOGOUT }).toJS()).toEqual(expectedState.toJS());
  });
});
