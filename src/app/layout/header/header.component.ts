import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { BannerComponent, Notification } from 'src/app/components';
import { ThemeToggleService } from 'src/app/utils';

import { Nav, NavComponent } from '../nav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, BannerComponent, NavComponent],
})
export class HeaderComponent {
  public $Banner: InputSignal<Notification | undefined> = input<Notification>();
  public $Nav: InputSignal<Nav> = input.required<Nav>();

  constructor(protected themeToggleService: ThemeToggleService) {}
}
