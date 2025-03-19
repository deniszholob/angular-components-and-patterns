import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipDirective, TooltipPosition } from 'src/app/utils';

import { Link } from './link.model';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, TooltipDirective],
})
export class LinkComponent {
  protected readonly TooltipPosition = TooltipPosition;
  @Input({ required: true })
  public link!: Link;
}
