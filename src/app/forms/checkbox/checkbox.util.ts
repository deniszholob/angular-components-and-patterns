// Checkbox Utilities

import { CheckboxSection } from './checkbox.model';

export function areAllChecked<T>(sections: CheckboxSection<T>[]): boolean {
  return sections.every((section) =>
    section.items.every((item) => item.checked),
  );
}

export function areSomeChecked<T>(sections: CheckboxSection<T>[]): boolean {
  return sections.some((section) => section.items.some((item) => item.checked));
}
