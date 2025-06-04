import { Checkbox, CheckboxSection } from './checkbox.model';

export const MOCK_Checkbox: Checkbox = {
  id: '1',
  display: 'Checkbox Entry 1',
  checked: true,
  data: undefined,
};

export const MOCK_CheckboxSection: CheckboxSection = {
  display: 'Section 1',
  items: [
    { id: '1_1', display: 'Item 1', data: undefined, checked: false },
    {
      id: '1_2',
      display: 'Item 2',
      data: undefined,
      checked: false,
      disabled: false,
    },
    { id: '1_3', display: 'Item 3', data: undefined, checked: false },
  ],
};

export const MOCK_CheckboxSectionList: CheckboxSection[] = [
  MOCK_CheckboxSection,
  {
    display: 'Section 2',
    items: [
      { id: '2_1', display: 'Item 1', data: undefined, checked: false },
      { id: '2_2', display: 'Item 2', data: undefined, checked: false },
      { id: '2_3', display: 'Item 3', data: undefined, checked: false },
    ],
  },
];
