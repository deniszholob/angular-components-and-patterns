// import { faker } from '@faker-js/faker';

import { Link } from './link.model';

// ===== Simple Mock ====== //
export const MOCK_Link: Link = {
  display: 'Google',
  url: 'https://google.com',
  title: 'Google Search',
  icon: 'fab fa-google',
  external: true,
  note: 'Search the web',
};

export const MOCK_Link_Array: Link[] = [MOCK_Link];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_Link(): Link {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_Link_Array(count: number): Link[] {
//   return faker.helpers.multiple(createMock_Link, { count });
// }

// export const MOCK_Link: Link = createMock_Link();
// export const MOCK_Link_Array: Link[] = createMock_Link_Array(5);
