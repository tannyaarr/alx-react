import uiReducer from './uiReducer';
import { 
  DISPLAY_NOTIFICATION_DRAWER, 
  HIDE_NOTIFICATION_DRAWER, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGOUT 
} from '../actions/uiActionTypes';

describe('uiReducer', () => {
  const initialState = {
    isNotificationDrawerVisible: false,
    isUserLoggedIn: false,
    user: {}
  };

  it('should return the initial state when no action is passed', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState);
  });

  it('should return the initial state when the action SELECT_COURSE is passed', () => {
    expect(uiReducer(undefined, { type: 'SELECT_COURSE' })).toEqual(initialState);
  });

  it('should handle DISPLAY_NOTIFICATION_DRAWER action', () => {
    const expectedState = {
      ...initialState,
      isNotificationDrawerVisible: true
    };
    expect(uiReducer(initialState, { type: DISPLAY_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('should handle HIDE_NOTIFICATION_DRAWER action', () => {
    const stateWithDrawerVisible = {
      ...initialState,
      isNotificationDrawerVisible: true
    };
    const expectedState = {
      ...initialState,
      isNotificationDrawerVisible: false
    };
    expect(uiReducer(stateWithDrawerVisible, { type: HIDE_NOTIFICATION_DRAWER })).toEqual(expectedState);
  });

  it('should handle LOGIN_SUCCESS action', () => {
    const expectedState = {
      ...initialState,
      isUserLoggedIn: true
    };
    expect(uiReducer(initialState, { type: LOGIN_SUCCESS })).toEqual(expectedState);
  });

  it('should handle LOGIN_FAILURE action', () => {
    const expectedState = {
      ...initialState,
      isUserLoggedIn: false
    };
    expect(uiReducer(initialState, { type: LOGIN_FAILURE })).toEqual(expectedState);
  });

  it('should handle LOGOUT action', () => {
    const stateWithUserLoggedIn = {
      ...initialState,
      isUserLoggedIn: true
    };
    const expectedState = {
      ...initialState,
      isUserLoggedIn: false
    };
    expect(uiReducer(stateWithUserLoggedIn, { type: LOGOUT })).toEqual(expectedState);
  });
});
