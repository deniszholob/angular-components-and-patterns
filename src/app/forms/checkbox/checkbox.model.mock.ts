import { Checkbox } from './checkbox.model';

export const MOCK_Checkbox: Checkbox<{ foo: string }> = {
  id: '1',
  display: 'Checkbox Entry 1',
  checked: true,
  data: { foo: 'bar' },
};
