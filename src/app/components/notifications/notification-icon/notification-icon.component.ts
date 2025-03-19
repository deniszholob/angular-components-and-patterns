import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

import { NotificationType } from '../notification-type.enum';

/** Notification Icon */
@Component({
  selector: 'app-notification-icon',
  templateUrl: './notification-icon.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule],
})
export class NotificationIconComponent {
  protected readonly NotificationType = NotificationType;

  public $NotificationType: InputSignal<NotificationType> =
    input.required<NotificationType>();
}
