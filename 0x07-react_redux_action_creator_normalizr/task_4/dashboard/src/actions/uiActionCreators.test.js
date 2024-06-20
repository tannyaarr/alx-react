import { login, logout, displayNotificationDrawer, hideNotificationDrawer } from './uiActionCreators';
import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

describe('UI action creators', () => {
  test('login action', () => {
    const email = 'test@example.com';
    const password = 'password';
    const expectedAction = {
      type: LOGIN,
      user: { email, password }
    };
    expect(login(email, password)).toEqual(expectedAction);
  });

  test('logout action', () => {
    const expectedAction = { type: LOGOUT };
    expect(logout()).toEqual(expectedAction);
  });

  test('displayNotificationDrawer action', () => {
    const expectedAction = { type: DISPLAY_NOTIFICATION_DRAWER };
    expect(displayNotificationDrawer()).toEqual(expectedAction);
  });

  test('hideNotificationDrawer action', () => {
    const expectedAction = { type: HIDE_NOTIFICATION_DRAWER };
    expect(hideNotificationDrawer()).toEqual(expectedAction);
  });
});