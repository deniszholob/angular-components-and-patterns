import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

import { Checkbox } from './checkbox.model';

/** @ref https://github.com/angular/components/blob/main/src/material/checkbox/checkbox.ts */
@Component({
  standalone: true,
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  host: { class: 'contents' },
  imports: [CommonModule],
})
export class CheckboxComponent implements Checkbox {
  // Not used but required in model
  public readonly data = undefined;

  @Input()
  public id: string = '';
  @Input({ required: true })
  public checked: boolean = false;
  /**
   * While the indeterminate property of the checkbox is true, it will render as indeterminate regardless of the checked value.
   * Any interaction with the checkbox by a user (i.e., clicking) will remove the indeterminate state.
   */
  @Input()
  public indeterminate: boolean = false;
  @Input()
  public disabled: boolean = false;
  @Input()
  public display: string = '';

  @Output()
  public readonly checkedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output()
  public readonly indeterminateChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  /** The native `<input #input type="checkbox">` element */
  @ViewChild('input')
  protected _inputElement?: ElementRef<HTMLInputElement>;

  public toggle(): void {
    if (this.disabled) return;

    // Clear indeterminate if active
    if (this.indeterminate) {
      this.indeterminate = false;
      this.indeterminateChange.emit(false);
      this.checked = !this.checked;
    }

    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);

    // Hve to assign the value again here  in case it was changed
    // inside the `change` listener which will cause the input to be out of sync.
    // Can happen with indeterminate state change logic on consuming components
    if (this._inputElement) {
      this._inputElement.nativeElement.checked = this.checked;
      this._inputElement.nativeElement.indeterminate = this.indeterminate;
    }
  }

  protected _onInputClick(): void {
    this.toggle();
  }

  protected _onInteractionEvent(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();
  }
}
