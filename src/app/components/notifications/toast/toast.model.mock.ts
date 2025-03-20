import { faker } from '@faker-js/faker';

import { NotificationType } from '../notification-type.enum';
import { Toast } from './toast.model';

// ===== Simple Mock ====== //
// export const MOCK_Toast: Toast = {
//   id: 0,
//   type: NotificationType.Info,
//   text: 'Message',
//   title: 'Title',
//   subtitle: 'Subtitle',
//   percentage: 50,
//   created: 0,
//   duration: 0,
// };

// export const MOCK_Toast_Array: Toast[] = [MOCK_Toast];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
export function createMock_Toast(): Toast {
  const created = faker.date.recent().getTime();
  return {
    id: created,
    type: faker.helpers.enumValue(NotificationType),
    text: faker.lorem.sentence(),
    title: faker.lorem.words(),
    subtitle: faker.lorem.words(),
    percentage: faker.number.int({ min: 0, max: 100 }),
    created: created,
    duration: faker.helpers.maybe(() =>
      faker.number.int({ min: 3000, max: 10000 }),
    ),
  };
}

export function createMock_Toast_Array(count: number): Toast[] {
  return faker.helpers.multiple(createMock_Toast, { count });
}

export const MOCK_Toast: Toast = createMock_Toast();
export const MOCK_Toast_Array: Toast[] = createMock_Toast_Array(5);
