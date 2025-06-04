import { take } from 'rxjs';
import {
  Checkbox,
  CheckboxSection,
  createMockCheckbox,
  createMockCheckboxSection,
} from 'src/app/forms/checkbox/checkbox.model';

import { CheckboxSelection } from './checkbox-selection.class';

describe('CheckboxSelection', () => {
  let checkbox1: Checkbox;
  let checkbox2: Checkbox;
  let checkbox3: Checkbox;
  let sections: CheckboxSection[];
  let model: CheckboxSelection;

  beforeEach(() => {
    checkbox1 = createMockCheckbox({ id: '1', checked: false });
    checkbox2 = createMockCheckbox({ id: '2', checked: false });
    checkbox3 = createMockCheckbox({ id: '3', checked: true, disabled: true });

    sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];

    model = new CheckboxSelection(sections);
  });

  it('should initialize correctly', () => {
    expect(model.allChecked).toBe(false);
    expect(model.someChecked).toBe(true); // one checked (even if disabled)
    expect(model.allNextValue).toBe(true);
  });

  it('should update sections and states via setSections()', () => {
    const newItem = createMockCheckbox({ id: '4', checked: true });
    const newSections = [createMockCheckboxSection([newItem])];

    let emittedSections: CheckboxSection[] = [];
    model.sectionsChange$
      .pipe(take(1))
      .subscribe((val) => (emittedSections = val));

    model.setSections(newSections);
    expect(model.allChecked).toBe(true);
    expect(model.someChecked).toBe(true);
    expect(model.allNextValue).toBe(false);
    expect(emittedSections).toBe(newSections);
  });

  it('should toggle all checkboxes with setAll()', () => {
    let emittedItems: Checkbox[] = [];
    model.itemsChange$.pipe(take(1)).subscribe((val) => (emittedItems = val));

    model.setAll();

    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true); // disabled, unchanged
    expect(emittedItems).toEqual([checkbox1, checkbox2]);
    expect(model.allChecked).toBe(true);
    expect(model.allNextValue).toBe(false);
  });

  it('should toggle an individual item', () => {
    let emitted: Checkbox[] = [];
    model.itemsChange$.pipe(take(1)).subscribe((val) => (emitted = val));

    model.toggleItem(checkbox1);
    expect(checkbox1.checked).toBe(true);
    expect(emitted).toEqual([checkbox1]);
  });

  it('should not toggle disabled item', () => {
    let emitted: Checkbox[] = [];
    model.itemsChange$.pipe(take(1)).subscribe((val) => (emitted = val));

    model.toggleItem(checkbox3);
    expect(checkbox3.checked).toBe(true);
    expect(emitted).toEqual([]);
  });

  describe('should maintain correct state after setAll → toggleItem → setAll', () => {
    it('with a starting disabled item', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: false });
      checkbox2 = createMockCheckbox({ id: '2', checked: false });
      checkbox3 = createMockCheckbox({
        id: '3',
        checked: true,
        disabled: true,
      });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // apply _allNextValue = true → sets checkbox1 & 2 = true
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(true);
      expect(model.someChecked).toBe(true); // True since all are checked
      expect(model.allChecked).toBe(true); // All non-disabled are checked
      expect(model.allNextValue).toBe(false);

      model.toggleItem(checkbox1); // flip one to false
      expect(checkbox1.checked).toBe(false);
      expect(model.someChecked).toBe(true); // 1 checked (disabled) + 1 checked (checkbox2)
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(false);

      model.setAll(); // apply _allNextValue = false → sets checkbox1 & 2 = false
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(true); // stays the same
      expect(model.someChecked).toBe(true); // only disabled checkbox checked
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);
    });

    it('with a starting disabled item (inverse)', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: true });
      checkbox2 = createMockCheckbox({ id: '2', checked: true });
      checkbox3 = createMockCheckbox({
        id: '3',
        checked: false,
        disabled: true,
      });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // apply _allNextValue = true → sets checkbox1 & 2 = true
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.someChecked).toBe(true);

      model.toggleItem(checkbox1); // flip one to false
      expect(checkbox1.checked).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.someChecked).toBe(true);

      model.setAll(); // apply _allNextValue = false → sets checkbox1 & 2 = false
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(false); // stays the same
      expect(model.allChecked).toBe(false);
      expect(model.someChecked).toBe(false);
    });

    it('with no starting disabled items (mixed)', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: false });
      checkbox2 = createMockCheckbox({ id: '2', checked: false });
      checkbox3 = createMockCheckbox({ id: '3', checked: true });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // apply _allNextValue = true
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(true);
      expect(model.someChecked).toBe(true);
      expect(model.allNextValue).toBe(false);
      expect(model.allChecked).toBe(true);
      expect(model.allNextValue).toBe(false);

      model.toggleItem(checkbox1); // flip one to false
      expect(checkbox1.checked).toBe(false);
      expect(model.someChecked).toBe(true);
      expect(model.allNextValue).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(false);

      model.setAll(); // apply _allNextValue = false
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(false);
      expect(model.someChecked).toBe(false);
      expect(model.allNextValue).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);
    });

    it('with no starting disabled items (all false)', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: false });
      checkbox2 = createMockCheckbox({ id: '2', checked: false });
      checkbox3 = createMockCheckbox({ id: '3', checked: false });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // apply _allNextValue = true
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(true);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(true);
      expect(model.allNextValue).toBe(false);

      model.toggleItem(checkbox1); // flip one to false
      expect(checkbox1.checked).toBe(false);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(false);

      model.setAll(); // apply _allNextValue = false
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(false);
      expect(model.someChecked).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);
    });

    it('with no starting disabled items (all true)', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: true });
      checkbox2 = createMockCheckbox({ id: '2', checked: true });
      checkbox3 = createMockCheckbox({ id: '3', checked: true });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(true);
      expect(model.allNextValue).toBe(false);

      model.setAll(); // apply _allNextValue = true
      expect(checkbox1.checked).toBe(false);
      expect(checkbox2.checked).toBe(false);
      expect(checkbox3.checked).toBe(false);
      expect(model.someChecked).toBe(false);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.toggleItem(checkbox1); // flip one to true
      expect(checkbox1.checked).toBe(true);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // apply _allNextValue = false
      expect(checkbox1.checked).toBe(true);
      expect(checkbox2.checked).toBe(true);
      expect(checkbox3.checked).toBe(true);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(true);
      expect(model.allNextValue).toBe(false);
    });
  });

  it('should toggle toggleItem → setAll → toggleItem correctly', () => {
    // Verify initial state
    expect(checkbox1.checked).toBe(false);
    expect(checkbox2.checked).toBe(false);
    expect(checkbox3.checked).toBe(true);
    expect(model.someChecked).toBe(true);
    expect(model.allChecked).toBe(false);
    expect(model.allNextValue).toBe(true);

    model.toggleItem(checkbox2); // false → true
    expect(checkbox2.checked).toBe(true);
    expect(model.someChecked).toBe(true); // checkbox2 + checkbox3 (disabled)
    expect(model.allNextValue).toBe(true);

    model.setAll(); // allNextValue = true,
    expect(checkbox1.checked).toBe(true);
    expect(checkbox2.checked).toBe(true);
    expect(checkbox3.checked).toBe(true);
    expect(model.someChecked).toBe(true); // disabled one is still checked
    expect(model.allChecked).toBe(true);
    expect(model.allNextValue).toBe(false);

    model.toggleItem(checkbox1); // now checkbox1 = true
    expect(checkbox1.checked).toBe(false);
    expect(model.someChecked).toBe(true);
  });

  describe('should correctly flip state with repeated setAll() calls', () => {
    it('with disabled items', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: false });
      checkbox2 = createMockCheckbox({ id: '2', checked: false });
      checkbox3 = createMockCheckbox({
        id: '3',
        checked: true,
        disabled: true,
      });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // all → true
      expect(model.allChecked).toBe(true);

      model.setAll(); // all → false
      expect(model.allChecked).toBe(false);
      expect(model.someChecked).toBe(true);

      model.setAll(); // all → true again
      expect(model.allChecked).toBe(true);
    });

    it('no disabled items', () => {
      checkbox1 = createMockCheckbox({ id: '1', checked: false });
      checkbox2 = createMockCheckbox({ id: '2', checked: false });
      checkbox3 = createMockCheckbox({ id: '3', checked: true });
      sections = [createMockCheckboxSection([checkbox1, checkbox2, checkbox3])];
      model = new CheckboxSelection(sections);
      expect(model.someChecked).toBe(true);
      expect(model.allChecked).toBe(false);
      expect(model.allNextValue).toBe(true);

      model.setAll(); // all → true
      expect(model.allChecked).toBe(true);

      model.setAll(); // all → false
      expect(model.allChecked).toBe(false);
      expect(model.someChecked).toBe(false);

      model.setAll(); // all → true again
      expect(model.allChecked).toBe(true);
    });
  });

  it('should never toggle disabled checkbox', () => {
    model.setAll();
    expect(checkbox3.checked).toBe(true);

    model.setAll();
    expect(checkbox3.checked).toBe(true);

    model.toggleItem(checkbox3);
    expect(checkbox3.checked).toBe(true); // never changes
  });
});
