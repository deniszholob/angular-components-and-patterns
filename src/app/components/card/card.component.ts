import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CheckboxComponent } from '../../forms/checkbox/checkbox.component';
import { Card } from './card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  // host: { class: 'contents' },
  imports: [CommonModule, CheckboxComponent],
})
export class CardComponent implements Card {
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
  // constructor() {}

  @Input()
  public id: string = 'false';

  @Input()
  public disabled: boolean = false;

  @Input()
  public title: string = '';

  @Input()
  public subtitle: string = '';

  @Input()
  public selectable: boolean = false;

  @Input()
  public selected: boolean = false;
  @Output()
  public readonly selectedChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  public toggleSelected(): void {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
}
