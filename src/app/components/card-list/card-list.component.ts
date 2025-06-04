import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Checkbox, CheckboxSection } from 'src/app/forms';

import { CheckboxComponent } from '../../forms/checkbox/checkbox.component';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.model';
import { CheckboxSelection } from '../checkbox-selection/checkbox-selection.class';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
  host: { class: 'contents' },
  imports: [CommonModule, CardComponent, CheckboxComponent],
})
export class CardListComponent {
  // @HostBinding('class') protected readonly class = 'contents'; // Makes component host as if it was not there, can offer less css headaches. Assumes .contents{display:contents} css class exits
  // constructor() {}

  private _sections: CheckboxSection<Card>[] = [];
  @Input()
  public set sections(sections: CheckboxSection<Card>[]) {
    this._sections = sections;
    this.checkboxSelection.setSections(sections);
  }
  public get sections(): CheckboxSection<Card>[] {
    return this._sections;
  }

  @Output()
  public sectionsChange: EventEmitter<CheckboxSection<Card>[]> =
    new EventEmitter<CheckboxSection<Card>[]>();
  @Output()
  public itemsChange: EventEmitter<Checkbox[]> = new EventEmitter<Checkbox[]>();

  protected checkboxSelection: CheckboxSelection<Card> =
    new CheckboxSelection<Card>(this._sections);
}
