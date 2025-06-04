import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-flag',
  templateUrl: './banner-flag.component.html',
  styles: [':host{display:contents}'],
  standalone: true,
  imports: [CommonModule],
})
export class BannerFlagComponent {
  @Input()
  public color: string = 'from-orange-700 to-orange-900';
}
