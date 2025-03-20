// import { faker } from '@faker-js/faker';

import { NotificationType } from '../notifications';
import { ProgressBar } from './progress-bar.model';

// ===== Simple Mock ====== //
export const MOCK_ProgressBar: ProgressBar = {
  type: NotificationType.Info,
  percentage: 50,
};

export const MOCK_ProgressBar_Array: ProgressBar[] = [MOCK_ProgressBar];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_ProgressBar(): ProgressBar {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_ProgressBar_Array(count: number): ProgressBar[] {
//   return faker.helpers.multiple(createMock_ProgressBar, { count });
// }

// export const MOCK_ProgressBar: ProgressBar = createMock_ProgressBar();
// export const MOCK_ProgressBar_Array: ProgressBar[] = createMock_ProgressBar_Array(5);
