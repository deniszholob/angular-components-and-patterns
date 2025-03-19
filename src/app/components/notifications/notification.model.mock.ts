// import { faker } from '@faker-js/faker';

import { Notification } from './notification.model';
import { NotificationType } from './notification-type.enum';

// ===== Simple Mock ====== //
export const MOCK_Notification: Notification = {
  text: 'Notification Text',
  type: NotificationType.Info,
};

export const MOCK_Notification_Array: Notification[] = [MOCK_Notification];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Notification(): Notification {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_Notification_Array(count: number): Notification[] {
//   return faker.helpers.multiple(createMock_Notification, { count });
// }

// export const MOCK_Notification: Notification = createMock_Notification();
// export const MOCK_Notification_Array: Notification[] = createMock_Notification_Array(5);
