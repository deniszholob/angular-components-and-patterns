// Checkbox Utilities

import { CheckboxSection } from './checkbox.model';

export function areAllChecked(sections: CheckboxSection[]): boolean {
  return sections.every((section) =>
    section.items.every((item) => item.checked),
  );
}

export function areSomeChecked(sections: CheckboxSection[]): boolean {
  return sections.some((section) => section.items.some((item) => item.checked));
}
