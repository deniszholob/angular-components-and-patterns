import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';

/** Modal */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule],
})
export class ModalComponent {
  // public $Modal: InputSignal<Modal> = input.required<Modal>();

  public modalClose = output<boolean>();
  public modalAction = output();
}
