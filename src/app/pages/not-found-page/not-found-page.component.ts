import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/** Not Found Page */
@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule],
})
export class NotFoundPageComponent {
  // TODO: Add a way to display the invalid route in html
}
