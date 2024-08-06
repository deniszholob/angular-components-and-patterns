import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ObjectInfo } from 'src/app/utils';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class BreadcrumbsComponent {
  public links: InputSignal<ObjectInfo[]> = input<ObjectInfo[]>([]);
}
