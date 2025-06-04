// Checkbox Utilities

import { CheckboxSection } from './checkbox.model';

export function areSomeChecked<T>(sections: CheckboxSection<T>[]): boolean {
  return sections.some((section) => section.items.some((item) => item.checked));
}

export function areSomeNotChecked<T>(sections: CheckboxSection<T>[]): boolean {
  return sections.some((section) =>
    section.items.some((item) => !item.checked),
  );
}

export function areAllChecked<T>(
  sections: CheckboxSection<T>[],
  ignoreDisabled: boolean = true,
): boolean {
  return sections.every((section) =>
    section.items.every(
      (item) => (ignoreDisabled && item.disabled) || item.checked,
    ),
  );
}

export function areAllNotChecked<T>(
  sections: CheckboxSection<T>[],
  ignoreDisabled: boolean = true,
): boolean {
  return sections.every((section) =>
    section.items.every(
      (item) => (ignoreDisabled && item.disabled) || !item.checked,
    ),
  );
}
