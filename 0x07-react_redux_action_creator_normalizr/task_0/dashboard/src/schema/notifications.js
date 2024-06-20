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
  return notificationsData.default.filter(
    (notification) => notification.author.id === userId
  ).map((notification) => notification.context);
}

export { normalizedData };