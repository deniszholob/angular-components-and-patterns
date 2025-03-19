import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Nav } from './nav.model';

/** Nav */
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, RouterModule],
})
export class NavComponent {
  public $Nav: InputSignal<Nav> = input.required<Nav>();
}
