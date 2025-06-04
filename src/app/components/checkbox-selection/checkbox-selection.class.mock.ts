// import { faker } from '@faker-js/faker';

import { MOCK_CheckboxSectionList } from 'src/app/forms/checkbox/checkbox.model.mock';

import { CheckboxSelection } from './checkbox-selection.class';

// ===== Simple Mock ====== //
export const MOCK_CheckboxSelection: CheckboxSelection<undefined> =
  new CheckboxSelection<undefined>([...MOCK_CheckboxSectionList]);

export const MOCK_CheckboxSelection_Array: CheckboxSelection<undefined>[] = [
  MOCK_CheckboxSelection,
];

// ===== Advanced Mock with https://v9.fakerjs.dev/api/ ====== //
// export function createMock_CheckboxSelection(): CheckboxSelection {
//   return {
//     id: faker.string.uuid(),
//   };
// }

// export function createMock_CheckboxSelection_Array(count: number): CheckboxSelection[] {
//   return faker.helpers.multiple(createMock_CheckboxSelection, { count });
// }

// export const MOCK_CheckboxSelection: CheckboxSelection = createMock_CheckboxSelection();
// export const MOCK_CheckboxSelection_Array: CheckboxSelection[] = createMock_CheckboxSelection_Array(5);
