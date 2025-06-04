import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CheckboxComponent } from 'src/app/forms/checkbox/checkbox.component';
import {
  Checkbox,
  CheckboxSection,
} from 'src/app/forms/checkbox/checkbox.model';
import {
  areAllChecked,
  areSomeChecked,
} from 'src/app/forms/checkbox/checkbox.util';

@Component({
  selector: 'app-checkbox-selection',
  templateUrl: './checkbox-selection.component.html',
  host: { class: 'contents' },
  imports: [CommonModule, CheckboxComponent],
})
export class CheckboxSelectionComponent {
  private _sections: CheckboxSection[] = [];
  @Input()
  public set sections(sections: CheckboxSection[]) {
    this._sections = sections;

    this.updateStates();
    this.allNextValue = !this.allChecked;
  }
  public get sections(): CheckboxSection[] {
    return this._sections;
  }

  @Output()
  public sectionsChange: EventEmitter<CheckboxSection[]> = new EventEmitter<
    CheckboxSection[]
  >();
  @Output()
  public itemsChange: EventEmitter<Checkbox[]> = new EventEmitter<Checkbox[]>();

  protected allChecked: boolean = areAllChecked(this.sections);
  protected someChecked: boolean = areSomeChecked(this.sections);
  protected allNextValue: boolean = !this.allChecked;

  protected onCheckboxToggleAll(check?: boolean): void {
    // this.allNextValue = check != null ? check : !this.allChecked;
    // this.allNextValue = !this.allChecked;
    const changedItems: Checkbox[] = [];

    this.sections.forEach((section: CheckboxSection) => {
      section.items
        .filter((item) => !item.disabled)
        .forEach((item) => {
          const prev: boolean = item.checked;
          item.checked = this.allNextValue;
          if (prev !== item.checked) changedItems.push(item);
        });
    });
    this.allNextValue = !this.allNextValue;

    this.itemsChange.emit(changedItems);
    this.updateStates();
  }

  protected onCheckboxToggle(item: Checkbox): void {
    item.checked = !item.checked;

    this.itemsChange.emit([item]);
    this.updateStates();
  }

  private updateStates(): void {
    this.allChecked = areAllChecked(this.sections);
    this.someChecked = areSomeChecked(this.sections);

    this.sectionsChange.emit(this.sections);
  }
}
