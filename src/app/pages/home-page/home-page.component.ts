import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

/** Home Page */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [':host{display:contents}'],
  imports: [CommonModule],
})
export class HomePageComponent {}
