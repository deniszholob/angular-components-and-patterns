import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

import { Notification } from '../notification.model';
import { NotificationIconComponent } from '../notification-icon';
import { NotificationType } from '../notification-type.enum';

/** Alert @see https://clarity.design/documentation/alert */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, NotificationIconComponent],
})
export class AlertComponent {
  protected readonly NotificationType = NotificationType;
  public $Alert: InputSignal<Notification> = input.required<Notification>();
}
