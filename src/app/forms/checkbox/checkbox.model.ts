import { ObjectInfo } from 'src/app/utils';

export interface Checkbox<T = undefined> extends ObjectInfo {
  /** Checkbox state */
  checked: boolean;
  /** Optional disabled state */
  disabled?: boolean;
  /** Optional data associated with the checkbox entry */
  data: T;
}

export interface CheckboxSection<T = undefined> {
  display: string;
  items: Checkbox<T>[];
}

export function createMockCheckbox(
  overrides: Partial<Checkbox> = {},
): Checkbox {
  return {
    id: 'mock_checkbox',
    display: 'Checkbox',
    checked: false,
    data: undefined,
    ...overrides,
  };
}

export function createMockCheckboxSection(
  items: Checkbox[],
  overrides: Partial<CheckboxSection> = {},
): CheckboxSection {
  return {
    display: 'Section',
    items,
    ...overrides,
  };
}

export function createMockCheckboxesFromBooleans(
  checks: boolean[],
): Checkbox[] {
  return checks.map((checked) => createMockCheckbox({ checked }));
}

export function createMockCheckboxSectionsFromBooleans(
  checks: boolean[][],
): CheckboxSection[] {
  return checks.map((check) =>
    createMockCheckboxSection(createMockCheckboxesFromBooleans(check)),
  );
}
