import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ToastComponent, ToastHoverEvent } from '../toast.component';
import { Toast } from '../toast.model';

/** Toast Container */
@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, ToastComponent],
})
export class ToastContainerComponent {
  @Input({ required: true })
  public toasts: Toast[] = [];

  @Output()
  public removeToast: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  public hover: EventEmitter<ToastHoverEvent> =
    new EventEmitter<ToastHoverEvent>();

  protected onRemoveAllToasts(): void {
    [...this.toasts].forEach((toast) => this.removeToast.emit(toast.id));
  }
}
