import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

import { NotificationType } from '../notifications/notification-type.enum';
import { ProgressBar } from './progress-bar.model';

/** Progress Bar */
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule],
})
export class ProgressBarComponent {
  protected readonly NotificationType = NotificationType;
  public $ProgressBar: InputSignal<ProgressBar> = input.required<ProgressBar>();
  // @Input()
  // public percentage!: number;
}
