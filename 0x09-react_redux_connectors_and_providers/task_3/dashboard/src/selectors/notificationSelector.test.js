import { fromJS, Map } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('notification selectors', () => {
  const state = {
    notifications: fromJS({
      filter: 'DEFAULT',
      notifications: {
        '1': { id: 1, isRead: false, type: 'default', value: 'New course available' },
        '2': { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
        '3': { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
      }
    })
  };

  it('filterTypeSelected works as expected', () => {
    const filter = filterTypeSelected(state);
    expect(filter).toEqual('DEFAULT');
  });

  it('getNotifications returns a list of the message entities within the reducer', () => {
    const notifications = getNotifications(state).toJS();
    const expectedNotifications = {
      '1': { id: 1, isRead: false, type: 'default', value: 'New course available' },
      '2': { id: 2, isRead: true, type: 'urgent', value: 'New resume available' },
      '3': { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
    };
    expect(notifications).toEqual(expectedNotifications);
  });

  it('getUnreadNotifications returns a list of the unread message entities within the reducer', () => {
    const unreadNotifications = getUnreadNotifications(state).toJS();
    const expectedUnreadNotifications = {
      '1': { id: 1, isRead: false, type: 'default', value: 'New course available' },
      '3': { id: 3, isRead: false, type: 'urgent', value: 'New data available' }
    };
    expect(unreadNotifications).toEqual(expectedUnreadNotifications);
  });
});