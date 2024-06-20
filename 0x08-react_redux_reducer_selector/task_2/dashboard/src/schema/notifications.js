import { normalize, schema } from 'normalizr';
import * as notificationsData from '../../notifications.json';

const user = new schema.Entity('users');

const message = new schema.Entity(
  'messages',
  {},
  { idAttribute: 'guid' }
);

const notification = new schema.Entity(
  'notifications',
  {
    author: user,
    context: message
  }
);

const normalizedData = normalize(notificationsData.default, [notification]);

export function getAllNotificationsByUser(userId) {
  const notifications = normalizedData.entities.notifications;
  const messages = normalizedData.entities.messages;
  const userNotifications = [];

  for (const notificationId in notifications) {
    if (notifications[notificationId].author === userId) {
      userNotifications.push(messages[notifications[notificationId].context]);
    }
  }

  return userNotifications;
}

export { normalizedData };