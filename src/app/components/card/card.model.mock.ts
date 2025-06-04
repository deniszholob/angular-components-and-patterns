// import { faker } from '@faker-js/faker';

import { Card } from './card.model';

// ===== Simple Mock ====== //
export const MOCK_Card: Card = {
  id: 'card_id',
  disabled: false,
  title: 'Card Title',
  subtitle: 'Card Subtitle',
  selectable: false,
  selected: false,
};

export const MOCK_Card_Array: Card[] = [MOCK_Card];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Card(): Card {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_Card_Array(count: number): Card[] {
//   return faker.helpers.multiple(createMock_Card, { count });
// }

// export const MOCK_Card: Card = createMock_Card();
// export const MOCK_Card_Array: Card[] = createMock_Card_Array(5);
