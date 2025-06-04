import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { CheckboxComponent } from 'src/app/forms/checkbox/checkbox.component';
import {
  Checkbox,
  CheckboxSection,
} from 'src/app/forms/checkbox/checkbox.model';

import { CheckboxSelection } from './checkbox-selection.class';

@Component({
  selector: 'app-checkbox-selection',
  templateUrl: './checkbox-selection.component.html',
  host: { class: 'contents' },
  imports: [CommonModule, CheckboxComponent],
})
export class CheckboxSelectionComponent<T = undefined> implements OnDestroy {
  private readonly clearSub$: Subject<void> = new Subject<void>();

  private _sections: CheckboxSection<T>[] = [];
  @Input()
  public set sections(sections: CheckboxSection<T>[]) {
    this._sections = sections;

    this.checkboxSelection.setSections(sections);
  }
  public get sections(): CheckboxSection<T>[] {
    return this._sections;
  }

  @Output()
  public sectionsChange: EventEmitter<CheckboxSection<T>[]> = new EventEmitter<
    CheckboxSection<T>[]
  >();
  @Output()
  public itemsChange: EventEmitter<Checkbox<T>[]> = new EventEmitter<
    Checkbox<T>[]
  >();

  constructor() {
    this.checkboxSelection.itemsChange$
      .pipe(takeUntil(this.clearSub$))
      .subscribe((items) => {
        this.itemsChange.emit(items);
      });
    this.checkboxSelection.sectionsChange$
      .pipe(takeUntil(this.clearSub$))
      .subscribe((sections) => {
        this.sectionsChange.emit(sections);
      });
  }
  public ngOnDestroy(): void {
    this.clearSub$.next();
    this.clearSub$.complete();
  }

  protected checkboxSelection: CheckboxSelection<T> = new CheckboxSelection(
    this._sections,
  );

  protected onCheckboxToggleAll(): void {
    this.checkboxSelection.setAll();
  }
  protected onCheckboxToggle(item: Checkbox<T>): void {
    this.checkboxSelection.toggleItem(item);
  }
}
