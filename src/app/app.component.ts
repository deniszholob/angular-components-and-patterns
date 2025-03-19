import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageLayoutComponent } from './layout/page-layout/page-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule, RouterModule, PageLayoutComponent],
})
export class AppComponent {}
