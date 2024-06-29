// src/containers/NotificationsContainer.test.js
import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsContainer from './NotificationsContainer';
import { fetchNotifications } from '../actions/notificationActionCreators';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn().mockReturnValue([]),
}));

jest.mock('../actions/notificationActionCreators', () => ({
  fetchNotifications: jest.fn(),
  setNotificationFilter: jest.fn(),
}));

describe('NotificationsContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch notifications on mount', () => {
    shallow(<NotificationsContainer />);
    expect(dispatch).toHaveBeenCalledWith(fetchNotifications());
  });
});
