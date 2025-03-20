import { CommonModule } from '@angular/common';
import {
  Component,
  HostListener,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';

import { ProgressBarComponent } from '../../progress-bar';
import { NotificationIconComponent } from '../notification-icon';
import { NotificationType } from '../notification-type.enum';
import { Toast } from './toast.model';

export interface ToastHoverEvent {
  id: number;
  hover: boolean;
}

/** Toast - Displays a informative message (no actions) that should disappear after a set duration */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, NotificationIconComponent, ProgressBarComponent],
})
export class ToastComponent {
  protected readonly NotificationType = NotificationType;
  public $toast: InputSignal<Toast> = input.required<Toast>();
  public removeToast: OutputEmitterRef<number> = output<number>();
  public hover: OutputEmitterRef<ToastHoverEvent> = output<ToastHoverEvent>();

  @HostListener('mouseenter')
  public onHover(): void {
    this.hover.emit({ id: this.$toast().id, hover: true });
  }

  @HostListener('mouseleave')
  public onLeave(): void {
    this.hover.emit({ id: this.$toast().id, hover: false });
  }
}
