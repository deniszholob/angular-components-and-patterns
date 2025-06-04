import { Observable, Subject } from 'rxjs';
import {
  Checkbox,
  CheckboxSection,
} from 'src/app/forms/checkbox/checkbox.model';
import {
  areAllChecked,
  areSomeChecked,
} from 'src/app/forms/checkbox/checkbox.util';

/** Mutable model for checkbox selection */
export class CheckboxSelection<T = undefined> {
  private _allChecked: boolean = areAllChecked(this.sections);
  public get allChecked(): boolean {
    return this._allChecked;
  }

  private _someChecked: boolean = areSomeChecked(this.sections);
  public get someChecked(): boolean {
    return this._someChecked;
  }

  private _allNextValue: boolean = !this._allChecked;
  public get allNextValue(): boolean {
    return this._allNextValue;
  }

  private sectionsChange: Subject<CheckboxSection<T>[]> = new Subject<
    CheckboxSection<T>[]
  >();
  public readonly sectionsChange$: Observable<CheckboxSection<T>[]> =
    this.sectionsChange.asObservable();

  private itemsChange: Subject<Checkbox<T>[]> = new Subject<Checkbox<T>[]>();
  public readonly itemsChange$: Observable<Checkbox<T>[]> =
    this.itemsChange.asObservable();

  constructor(private sections: CheckboxSection<T>[]) {
    this.updateStates();
    this._allNextValue = !this._allChecked;
  }

  public setSections(sections: CheckboxSection<T>[]): void {
    this.sections = sections;
    this.updateStates();
    this._allNextValue = !this._allChecked;
  }

  private updateStates(): void {
    this._allChecked = areAllChecked(this.sections);
    this._someChecked = areSomeChecked(this.sections);

    this.sectionsChange.next(this.sections);
  }

  /** Mark all non-disabled checkboxes as checked or unchecked */
  public setAll(): void {
    const changedItems: Checkbox<T>[] = [];

    for (const section of this.sections) {
      for (const item of section.items) {
        if (item.disabled) continue;
        const prev: boolean = item.checked;
        item.checked = this._allNextValue;
        if (prev !== item.checked) changedItems.push(item);
      }
    }
    this._allNextValue = !this._allNextValue;

    this.itemsChange.next(changedItems);
    this.updateStates();
  }

  /** Toggle a single item */
  public toggleItem(item: Checkbox<T>): void {
    if (item.disabled) return;
    item.checked = !item.checked;

    this.itemsChange.next([item]);
    this.updateStates();
  }
}
