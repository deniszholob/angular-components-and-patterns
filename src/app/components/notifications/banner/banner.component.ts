import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

import { Notification } from '../notification.model';
import { NotificationIconComponent } from '../notification-icon';
import { NotificationType } from '../notification-type.enum';

/** Banner @see https://clarity.design/documentation/alert */
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, NotificationIconComponent],
})
export class BannerComponent {
  protected readonly NotificationType = NotificationType;
  public $Banner: InputSignal<Notification> = input.required<Notification>();
}
