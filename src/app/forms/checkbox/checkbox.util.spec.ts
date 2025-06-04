import {
  CheckboxSection,
  createMockCheckboxSectionsFromBooleans,
} from './checkbox.model';
import { areAllChecked, areSomeChecked } from './checkbox.util';

// File Level Tests
describe('Checkbox Utilities', () => {
  // Function level tests
  describe('areAllChecked', () => {
    it('should return true when all items in all sections are checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[true, true], [true]]);
      expect(areAllChecked(sections)).toBe(true);
    });

    it('should return false when any item is not checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[true, false], [true]]);
      expect(areAllChecked(sections)).toBe(false);
    });
    it('should return false when all items are not checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[false, false], [false]]);
      expect(areAllChecked(sections)).toBe(false);
    });
  });

  describe('areSomeChecked', () => {
    it('should return true when some items are checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[false, false], [true]]);
      expect(areSomeChecked(sections)).toBe(true);
    });

    it('should return false when no items are checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[false, false], [false]]);
      expect(areSomeChecked(sections)).toBe(false);
    });

    it('should return true when all items are checked', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[true, true], [true]]);
      expect(areSomeChecked(sections)).toBe(true);
    });

    it('should return false when all sections are empty', () => {
      const sections: CheckboxSection[] = [];
      expect(areSomeChecked(sections)).toBe(false);
    });

    it('should return true when some items are checked in one section', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[true, false]]);
      expect(areSomeChecked(sections)).toBe(true);
    });
  });

  describe('both', () => {
    it('should handle empty sections array', () => {
      const sections: CheckboxSection[] = [];
      expect(areAllChecked(sections)).toBe(true); // vacuously true
      expect(areSomeChecked(sections)).toBe(false);
    });

    it('should handle section with empty items', () => {
      const sections: CheckboxSection[] =
        createMockCheckboxSectionsFromBooleans([[], [true]]);
      expect(areAllChecked(sections)).toBe(true); // vacuously true for empty items
      expect(areSomeChecked(sections)).toBe(true);
    });
  });
});
